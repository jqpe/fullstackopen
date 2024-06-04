import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery } from '@tanstack/react-query'
import { anecdoteService } from './requests'

const App = () => {
  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll
  })

  const anecdotes = anecdotesQuery.data

  if (
    anecdotesQuery.isError &&
    anecdotesQuery.error.message === 'Network Error'
  ) {
    return 'anecdote service not available due to problems in server'
  }

  if (anecdotesQuery.isLoading) {
    return 'loading...'
  }

  const handleVote = anecdote => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
