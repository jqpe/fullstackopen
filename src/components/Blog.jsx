import { useState } from 'react'

const Blog = ({ blog, handleLikeButtonClick, handleBlogDelete, username }) => {
  const [open, setOpen] = useState(false)

  console.log(username, blog)

  return (
    <details open={open} onClick={e => e.preventDefault()}>
      <summary>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'view'}</button>
      </summary>
      <a href={blog.url}>{blog.url}</a>
      <div>
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
