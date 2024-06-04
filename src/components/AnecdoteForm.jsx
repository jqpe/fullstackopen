import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  showNotification
} from '../reducers/notificationReducer'

export default function AnecodteForm() {
  const dispatch = useDispatch()

  const create = event => {
    event.preventDefault()
    const content = event.currentTarget.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(showNotification(`Created anecdote: "${content}"`))

    setTimeout(() => dispatch(clearNotification()), 5000)
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
