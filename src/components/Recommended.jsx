import { useQuery } from '@apollo/client'

import { useAuth } from '../hooks/useAuth'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

export default function Recommendations() {
  const [user] = useAuth()

  const meQuery = useQuery(ME)
  const me = meQuery.data?.me

  const allBooksQuery = useQuery(ALL_BOOKS, {
    variables: {
      genre: me?.favoriteGenre
    },
    skip: !me?.favoriteGenre
  })

  const books = allBooksQuery.data?.allBooks ?? []

  if (meQuery.loading || allBooksQuery.loading) {
    return 'loading...'
  }

  if (!user.token || books.length === 0) {
    return 'you have no personalized recommendations'
  }

  return (
    <>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{me.favoriteGenre}</b>
      </p>

      <BookTable books={books} selectedGenre={me.favoriteGenre} />
    </>
  )
}
