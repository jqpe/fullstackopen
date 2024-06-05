import { useEffect, useState } from 'react'
import usersService from '../services/users'

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
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
