import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'

import blogService from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const onSubmit = ({ username, password }) => {
    login({ username, password })
      .then(res => setUser(res.data))
      .catch()
  }

  if (!user) {
    return <LoginForm handleSubmit={onSubmit} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
