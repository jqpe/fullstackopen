import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  showNotification
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

export default function AnecodteForm() {
  const dispatch = useDispatch()

  const create = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdote = await anecdoteService.create({ content, votes: 0 })

    dispatch(createAnecdote(anecdote))
    dispatch(showNotification(`Created anecdote: "${content}"`))

    setTimeout(() => dispatch(clearNotification()), 5000)
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
