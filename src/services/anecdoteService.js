import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(url).then(res => res.data)
}

const anecdoteService = { getAll }

export default anecdoteService
