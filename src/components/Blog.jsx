import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <article>
      <Link component={RouterLink} to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </article>
  )
}

export default Blog
