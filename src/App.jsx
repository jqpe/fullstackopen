import { useEffect, useState } from 'react'

import { AddBlogForm } from './components/AddBlogForm'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'

import blogService, { addBlog } from './services/blogs'
import { login } from './services/login'
import { Notification } from './components/Notification'
import { AxiosError } from 'axios'

import './App.css'
import { Toggle } from './components/Toggle'

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
  const [notification, setNotification] = useState({
    message: null,
    variant: 'success'
  })

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
      .catch(() => {
        setNotification({ message: 'could not get posts', variant: 'error' })
      })
  }, [])

  const onSubmit = ({ username, password }) => {
    login({ username, password })
      .then(res => {
        window.localStorage.setItem('user', JSON.stringify(res.data))
        setUser(res.data)

        setNotification({
          message: `welcome back ${user.username}!`,
          variant: 'success'
        })
      })
      .catch(error => {
        if (error instanceof AxiosError) {
          setNotification({
            message: error.response.data.error,
            variant: 'error'
          })
        }

        setNotification({ message: 'unknown error', variant: 'error' })
      })
  }

  const onAddBlog = async ({ url, title, author }) => {
    let isSuccess = false
    await addBlog({ url, title, author, token: user.token })
      .then(res => {
        const blog = res.data
        setBlogs(blogs.concat(blog))
        setNotification({
          message: `A new blog ${blog.title} by ${blog.author} added`,
          variant: 'success'
        })

        isSuccess = true
      })
      .catch(error => {
        if (error instanceof AxiosError) {
          return setNotification({
            message: error.response.data.error,
            variant: 'error'
          })
        }

        console.log(error)

        setNotification({
          message: 'unknown error',
          variant: 'error'
        })
      })

    return isSuccess
  }

  if (!user) {
    return (
      <>
        <h2>login to application</h2>
        <Notification
          message={notification.message}
          variant={notification.variant}
        />
        <LoginForm handleSubmit={onSubmit} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        variant={notification.variant}
      />
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
          handleSubmit={async blog => {
            onAddBlog(blog).then(success => setIsToggleVisible(!success))
          }}
        />
      </Toggle>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
