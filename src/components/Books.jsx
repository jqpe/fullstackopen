import { useQuery } from '@apollo/client'
import { useSubscription } from '@apollo/client'

import { useState } from 'react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import FilterByGenre from './FilterByGenre'
import BookTable from './BookTable'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre || null
    }
  })

  // TODO: missing notification
  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const bookAdded = data.data.bookAdded

      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: {
            genre: selectedGenre || null
          }
        },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(bookAdded)
          }
        }
      )
    }
  })

  const books = result.data?.allBooks ?? []

  const allGenres = new Set(books.flatMap(book => book.genres))

  return (
    <div>
      <h2>books</h2>

      <FilterByGenre
        allGenres={allGenres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <BookTable books={books} selectedGenre={selectedGenre} />
    </div>
  )
}

export default Books
