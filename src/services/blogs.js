import axios from 'axios'
const baseUrl = new URL('/api/blogs', import.meta.env.VITE_API_URL)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }
