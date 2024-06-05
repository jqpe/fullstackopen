import { useEffect, useState } from 'react'
import usersService from '../services/users'

export default function UserView({ id }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    usersService
      .getAll()
      .then((response) => setUser(response.data.find((user) => user.id === id)))
  }, [id])

  if (!user) {
    return 'loading...'
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
