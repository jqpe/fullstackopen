import { useMutation, useQuery } from '@apollo/client'

import { useAuth } from '../hooks/useAuth'
import { useField } from '../hooks/useField'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const authors = result.data?.allAuthors ?? []
  const [user] = useAuth()

  const name = useField('name', authors.at(0)?.name)
  const born = useField('born')

  const onUpdateAuthor = event => {
    event.preventDefault()

    updateAuthor({
      variables: {
        name: name.field.value,
        setBornTo: Number(born.field.value)
      }
    })

    born.clear()
    name.clear(authors[0].name)
  }

  return (
    <div>
      <h2>authors</h2>
      <Table authors={authors} />
      <h3>Set birth year</h3>

      {user.token ? null : (
        <strong>You have to be logged in to edit authors</strong>
      )}

      <form onSubmit={onUpdateAuthor}>
        <fieldset disabled={!user.token}>
          <div>
            <label htmlFor="name">name</label>
            <select autoComplete="off" {...name.field}>
              {authors.map(author => (
                <option key={author.name}>{author.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="born">born</label>
            <input type="number" {...born.field} />
          </div>
          <button type="submit">update author</button>
        </fieldset>
      </form>
    </div>
  )
}

function Table({ authors }) {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {authors.map(a => (
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Authors
