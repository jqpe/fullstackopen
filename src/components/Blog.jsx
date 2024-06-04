import { useState } from 'react'

const Blog = ({ blog, handleLikeButtonClick, handleBlogDelete, username }) => {
  const [open, setOpen] = useState(false)

  return (
    <details open={open} onClick={event => event.preventDefault()}>
      <summary>
        <span>{blog.title}</span> <span>{blog.author}</span>{' '}
        <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'view'}</button>
      </summary>
      <a href={blog.url}>{blog.url}</a>
      <div className='likes-container'>
        likes {blog.likes}{' '}
        <button onClick={() => handleLikeButtonClick(blog)}>like</button>
      </div>
      <p>{blog.author}</p>

      {username === blog.user.username && (
        <button onClick={() => handleBlogDelete(blog)}>remove</button>
      )}
    </details>
  )
}

export default Blog
