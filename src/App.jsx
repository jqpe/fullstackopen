import { useEffect, useState } from 'react'

import { AddBlogForm } from './components/AddBlogForm'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'

import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'
import { Notification } from './components/Notification'
import blogService, { addBlog } from './services/blogs'
import { login } from './services/login'

import './App.css'
import { Toggle } from './components/Toggle'
import { showNotification } from './reducers/notificationReducer'

const getPersistedUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem('user'))
  } catch {
    return null
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(getPersistedUser())
  const [isToggleVisible, setIsToggleVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch(() => {
        dispatch(
          showNotification({
            message: 'could not get posts',
            variant: 'error',
          }),
        )
      })
  }, [dispatch])

  const onSubmit = ({ username, password }) => {
    login({ username, password })
      .then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.data))
        setUser(response.data)

        dispatch(
          showNotification({
            message: `welcome back ${user.username}!`,
            variant: 'success',
          }),
        )
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          dispatch(
            showNotification({
              message: error.response.data.error,
              variant: 'error',
            }),
          )
        }
      })
  }

  const onLikeButtonClick = (blog) => {
    blogService
      .update({ ...blog, likes: blog.likes + 1 })
      .then((response) => {
        const copy = [...blogs]
        const index = copy.findIndex((v) => v.id === response.data.id)
        copy[index] = response.data

        setBlogs(copy)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          dispatch(
            showNotification({
              message: error.response.data.error,
              variant: 'error',
            }),
          )
        }
      })
  }

  const onBlogDelete = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog, user.token)
        .then(() => {
          dispatch(
            showNotification({
              message: `removed ${blog.title}`,
              variant: 'success',
            }),
          )

          setBlogs(blogs.filter((v) => v.id !== blog.id))
        })
        .catch((error) => {
          dispatch(
            showNotification({
              message: error.response.data.error,
              variant: 'error',
            }),
          )
        })
    }
  }

  const onAddBlog = async ({ url, title, author }) => {
    let isSuccess = false
    await addBlog({ url, title, author, token: user.token })
      .then((response) => {
        const blog = response.data
        setBlogs([...blogs, blog])
        dispatch(
          showNotification({
            message: `A new blog ${blog.title} by ${blog.author} added`,
            variant: 'success',
          }),
        )

        isSuccess = true
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          dispatch(
            showNotification({
              message: error.response.data.error,
              variant: 'error',
            }),
          )
        }
      })

    return isSuccess
  }

  if (!user) {
    return (
      <>
        <h2>login to application</h2>

        <Notification />

        <LoginForm handleSubmit={onSubmit} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('user')
            setUser(null)
          }}
        >
          logout
        </button>
      </div>
      <Toggle
        open={isToggleVisible}
        onOpenChange={setIsToggleVisible}
        openPrompt="new note"
        closePrompt="cancel"
      >
        <AddBlogForm
          user={user}
          handleSubmit={async (blog) => {
            onAddBlog(blog).then((success) => setIsToggleVisible(!success))
          }}
        />
      </Toggle>

      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            username={user.username}
            key={blog.id}
            blog={blog}
            handleLikeButtonClick={onLikeButtonClick}
            handleBlogDelete={onBlogDelete}
          />
        ))}
    </div>
  )
}

export default App
