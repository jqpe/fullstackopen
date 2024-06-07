import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommended'
import AuthContext from './context/AuthContext'
import ApolloProvider from './context/ApolloProvider'

const initialUser = { token: localStorage.getItem('auth-token') }

const App = () => {
  const [user, setUser] = useState(initialUser)

  return (
    <AuthContext.Provider value={user}>
      <ApolloProvider>
        <nav style={{ display: 'flex', gap: 10 }}>
          <Link to="/">books</Link>
          <Link to="/authors">authors</Link>
          {user.token && <Link to="/recommendations">recommendations</Link>}
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
          <Route path="/recommendations" element={<Recommendations />} />
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
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
