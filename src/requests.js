import axios from 'axios'

const url = 'http://localhost:3001/anecdotes/'

 const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

 const create = async anecdote => {
  const res = await axios.post(url, { votes: 0, ...anecdote })
  return res.data
}

export const anecdoteService = { getAll, create }
