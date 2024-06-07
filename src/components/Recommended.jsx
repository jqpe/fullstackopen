import { useQuery } from '@apollo/client'
import { useContext } from 'react'

import AuthContext from '../context/AuthContext'
import { RECOMMENDATIONS } from '../queries'
import BookTable from './BookTable'

export default function Recommendations() {
  const user = useContext(AuthContext)
  const result = useQuery(RECOMMENDATIONS)

  const { me, allBooks } = result.data ?? {}

  const userBooks = allBooks ?? []

  if (result.loading) {
    return 'loading...'
  }

  if (!user.token || userBooks.length === 0) {
    return 'you have no personalized recommendations'
  }

  return (
    <>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{me.favoriteGenre}</b>
      </p>

      <BookTable books={userBooks} selectedGenre={me.favoriteGenre} />
    </>
  )
}
