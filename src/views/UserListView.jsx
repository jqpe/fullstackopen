import { useEffect, useState } from 'react'
import usersService from '../services/users'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'

export default function UserListView() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    usersService.getAll().then((response) => setUsers(response.data))
  }, [])

  return (
    <>
      <h2>Users</h2>
      {users && (
        <table>
          <thead>
            <tr>
              <td></td>
              <td>
                <b>blogs created</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link component={RouterLink} to={`/user/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
