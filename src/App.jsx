import { useEffect, useState } from 'react'

import { AddBlogForm } from './components/AddBlogForm'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'

import blogService, { addBlog } from './services/blogs'
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

  const onAddBlog = ({ url, title, author }) => {
    addBlog({ url, title, author, token: user.token }).then(res => {
      setBlogs(blogs.concat(res.data))
    })
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
      <h2>create new</h2>
      <AddBlogForm user={user} handleSubmit={onAddBlog} />

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
