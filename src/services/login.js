import axios from 'axios'

const baseUrl = new URL('/api/login', import.meta.env.VITE_API_URL)

export const login = async ({ username, password }) => {
  return await axios.post(baseUrl, { username, password })
}
