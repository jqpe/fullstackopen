import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { anecdoteService } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [, dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess(data) {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdote = anecdotes.findIndex(({ id }) => id === data.id)
      anecdotes[updatedAnecdote] = data

      queryClient.setQueryData(['anecdotes'], anecdotes)

      dispatchNotification({
        type: 'SET',
        payload: `Anecdonte '${data.content}' voted`
      })
      setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
    }
  })
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

  const handleVote = async anecdote => {
    anecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
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
