import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'

import AuthContext from '../context/AuthContext'
import { useField } from '../hooks/useField'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = () => {
  const user = useContext(AuthContext)
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const title = useField('title')
  const author = useField('author')
  const published = useField('published')
  const genre = useField('genre')

  const [genres, setGenres] = useState([])

  if (!user.token) {
    return 'you have to login to create books'
  }

  const submit = async event => {
    event.preventDefault()

    addBook({
      variables: {
        title: title.field.value,
        author: author.field.value,
        published: Number(published.field.value),
        genres
      }
    })

    for (const input of [title, author, published, genre]) {
      input.clear()
    }

    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.field.value))
    genre.clear()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title.field} />
        </div>
        <div>
          author
          <input {...author.field} />
        </div>
        <div>
          published
          <input type="number" {...published.field} />
        </div>
        <div>
          <input {...genre.field} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
