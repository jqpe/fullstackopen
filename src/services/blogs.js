import axios from 'axios'
const baseUrl = new URL('/api/blogs', import.meta.env.VITE_API_URL)

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const addBlog = ({ title, author, url, token }) => {
  return axios.post(
    baseUrl,
    { title, author, url },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

const blogsService = { addBlog, getAll }

export default blogsService
