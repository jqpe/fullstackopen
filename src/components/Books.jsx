import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const books = result.data?.allBooks ?? []

  const [selectedGenre, setSelectedGenre] = useState('')
  const allGenres = new Set(books.flatMap(book => book.genres))

  return (
    <div>
      <h2>books</h2>

      <section style={{ position: 'sticky', top: 0, background: 'gray' }}>
        filter by genre:{' '}
        {[...allGenres].map(genre => (
          <button
            style={
              selectedGenre === genre ? { background: 'aliceblue' } : undefined
            }
            key={genre}
            onClick={() =>
              selectedGenre === genre
                ? setSelectedGenre('')
                : setSelectedGenre(genre)
            }
          >
            {genre}
          </button>
        ))}
      </section>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(book => {
              return selectedGenre ? book.genres.includes(selectedGenre) : true
            })
            .map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
