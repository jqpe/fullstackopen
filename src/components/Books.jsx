import { useQuery } from '@apollo/client'

import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import FilterByGenre from './FilterByGenre'
import BookTable from './BookTable'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre || null
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
