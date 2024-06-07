import { useQuery } from '@apollo/client'

import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'
import FilterByGenre from './FilterByGenre'

const Books = ({ initialBooks }) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre || null
    }
  })

  const books = result.data?.allBooks ?? initialBooks ?? []

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
