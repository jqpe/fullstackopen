import axios from 'axios'

const baseUrl = new URL('/api/users/', import.meta.env.VITE_API_URL)

const getAll = async () => {
  const users = await axios.get(baseUrl)
  return users
}

const usersService = { getAll }

export default usersService
