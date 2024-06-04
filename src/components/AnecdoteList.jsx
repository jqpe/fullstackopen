import { useDispatch, useSelector } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) return anecdotes

    return anecdotes.filter(a => new RegExp(filter, 'ig').test(a.content))
  })
  const vote = id => dispatch(voteAnecdote(id))

  return anecdotes
    .toSorted((a, b) => b.votes - a.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
}
