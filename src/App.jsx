import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import AuthContext from './context/AuthContext'

const initialUser = { token: localStorage.getItem('auth-token') }

const App = () => {
  const [user, setUser] = useState(initialUser)

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    headers: {
      Authorization: user.token ? `Bearer ${user.token}` : undefined
    },
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={user}>
        <nav style={{ display: 'flex', gap: 10 }}>
          <Link to="/">books</Link>
          <Link to="/authors">authors</Link>
          {user.token && <Link to="/new-book">new book</Link>}
          {!user.token && <Link to="/login">login</Link>}
          {user.token && (
            <button
              onClick={() => {
                localStorage.removeItem('auth-token')
                setUser({ token: null })
              }}
            >
              logout
            </button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/new-book" element={<NewBook />} />
          <Route
            path="/login"
            element={
              <LoginForm
                onLogin={user => {
                  localStorage.setItem('auth-token', user.token)
                  setUser(user)
                }}
              />
            }
          />
        </Routes>
      </AuthContext.Provider>
    </ApolloProvider>
  )
}

export default App
