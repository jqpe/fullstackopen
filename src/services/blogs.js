import axios from 'axios'
const baseUrl = new URL('/api/blogs/', import.meta.env.VITE_API_URL)

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export const addBlog = ({ title, author, url, token }) => {
  return axios.post(
    baseUrl,
    { title, author, url },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

export const update = ({ title, author, url, likes, id, user }) => {
  return axios.put(new URL(id, baseUrl), {
    title,
    author,
    url,
    likes,
    user: user.id,
  })
}

export const remove = ({ id }, token) => {
  return axios.delete(new URL(id, baseUrl), {
    headers: { Authorization: `Bearer ${token}` },
  })
}

const blogService = { addBlog, getAll, update, remove }

export default blogService
