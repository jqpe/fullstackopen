import { useState } from 'react'

const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false)

  return (
    <details open={open} onClick={e => e.preventDefault()}>
      <summary>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'view'}</button>
      </summary>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes} <button>like</button>
      </div>
      <p>{blog.author}</p>
    </details>
  )
}

export default Blog
