import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export default function AnecodteForm() {
  const dispatch = useDispatch()

  const create = event => {
    event.preventDefault()
    dispatch(createAnecdote(event.currentTarget.anecdote.value))
    event.currentTarget.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
