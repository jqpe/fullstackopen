import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'

export default function BlogView({ id }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  const onLike = (blog) => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const onDelete = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog, user.token))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url} className="url">
        {blog.url}
      </a>
      <div className="likes-container">
        likes {blog.likes} <button onClick={() => onLike(blog)}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      {user.username === blog.user.username && (
        <button onClick={() => onDelete(blog)}>remove</button>
      )}
    </>
  )
}
