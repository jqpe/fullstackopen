import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { useField } from '../hooks/useField'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = () => {
  const [user] = useAuth()
  const [addBook] = useMutation(ADD_BOOK, {
    // following the instructions in
    // https://fullstackopen.com/en/part8/login_and_updating_the_cache#updating-cache-revisited
    // did not work for me, and instead example in
    // https://www.apollographql.com/docs/react/api/cache/InMemoryCache/#optimistic
    // works as intended
    update: (cache, { data: { addBook } }) => {
      const query = ALL_BOOKS
      const { allBooks } = cache.readQuery({ query })
      allBooks.push(addBook)
      cache.writeQuery({ query, data: allBooks })
    },

    refetchQueries: [{ query: ALL_AUTHORS }]
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
