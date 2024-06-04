import React from 'react'

export function LoginForm({ handleSubmit }) {
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        handleSubmit({ username, password })
      }}
    >
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
