import { useDispatch, useSelector } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  showNotification
} from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) return anecdotes

    return anecdotes.filter(a => new RegExp(filter, 'ig').test(a.content))
  })
  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted ${anecdote.content}`))

    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return anecdotes
    .toSorted((a, b) => b.votes - a.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button
            onClick={() => {
              vote(anecdote)
            }}
          >
            vote
          </button>
        </div>
      </div>
    ))
}
