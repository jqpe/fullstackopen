import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <article>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </article>
  )
}

export default Blog
