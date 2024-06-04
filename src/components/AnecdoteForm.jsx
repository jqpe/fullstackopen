import { useMutation, useQueryClient } from '@tanstack/react-query'
import { anecdoteService } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [, dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess(data) {
      const anecdote = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdote.concat(data))

      dispatchNotification({
        type: 'SET',
        payload: `Created anecdote '${data.content}'`
      })
      setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
    }
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    anecdoteMutation.mutate({ content })

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
