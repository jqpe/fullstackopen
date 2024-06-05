import { useEffect, useState } from 'react'

import { AddBlogForm } from './components/AddBlogForm'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'

import { AxiosError } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Notification } from './components/Notification'
import { login } from './services/login'

import './App.css'
import { Toggle } from './components/Toggle'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from './reducers/blogsReducer'
import { showNotification } from './reducers/notificationReducer'

const getPersistedUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem('user'))
  } catch {
    return null
  }
}

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(getPersistedUser())
  const [isToggleVisible, setIsToggleVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
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
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const onBlogDelete = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog, user.token))
    }
  }

  const onAddBlog = async ({ url, title, author }) => {
    const blog = { url, title, author, token: user.token }
    // dispatch is thenable but not a promise or an async function
    // we can return data from `createBlog` that will be used as return
    // value of dispatch
    dispatch(createBlog(blog)).then(
      (success) => success && setIsToggleVisible(false),
    )
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
