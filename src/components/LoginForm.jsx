import { useMutation } from '@apollo/client'

import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { LOGIN } from '../queries'

export default function LoginForm({ onLogin }) {
  const navigate = useNavigate()
  const username = useField('username')
  const password = useField('password')
  const [login] = useMutation(LOGIN)

  const onSubmit = async event => {
    event.preventDefault()

    const result = await login({
      variables: {
        username: username.field.value,
        password: password.field.value
      }
    })

    onLogin({ token: result.data.login.value })
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" {...username.field} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" {...password.field} />
      </div>

      <button type="submit">login</button>
    </form>
  )
}
