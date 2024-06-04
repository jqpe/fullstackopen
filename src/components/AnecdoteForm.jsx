import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

export default function AnecodteForm() {
  const dispatch = useDispatch()

  const create = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value

    dispatch(createAnecdote(content))
    dispatch(showNotification(`Created anecdote: "${content}"`, 5))

    event.target.anecdote.value = ''
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
