import axios from 'axios'

const baseUrl = new URL('/api/users/', import.meta.env.VITE_API_URL)

const getAll = async () => {
  const users = await axios.get(baseUrl)
  return users
}

const getUser = async (id) => {
  const users = await axios.get(new URL(id, baseUrl))
  return users
}

const usersService = { getAll, getUser }

export default usersService
