import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'

import blogService from './services/blogs'
import { login } from './services/login'

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

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const onSubmit = ({ username, password }) => {
    login({ username, password })
      .then(res => {
        window.localStorage.setItem('user', JSON.stringify(res.data))

        setUser(res.data)
      })
      .catch()
  }

  if (!user) {
    return <LoginForm handleSubmit={onSubmit} />
  }

  return (
    <div>
      <h2>blogs</h2>
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
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
