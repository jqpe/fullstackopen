import { Link, Route, Routes } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommended'
import { useAuth } from './hooks/useAuth'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import toast from 'react-hot-toast'

const App = () => {
  const [user, setUser] = useAuth()

  // We need this so that the subscription can write to it's cache
  // Otherwise notifications do not work in all routes
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: null
    }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const bookAdded = data.data.bookAdded

      toast(`New book added: ${bookAdded.title} by ${bookAdded.author.name}`)

      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: {
            genre: null
          }
        },
        data => {
          if (!data && !data.allBooks) {
            console.warn('can not update cache with data', data)
            return
          }

          return {
            allBooks: data.allBooks.concat(bookAdded)
          }
        }
      )
    }
  })

  return (
    <>
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
        <Route
          path="/"
          element={<Books initialBooks={result.data?.allBooks} />}
        />
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
    </>
  )
}

export default App
