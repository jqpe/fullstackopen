import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { showNotification } from '../reducers/notificationReducer'

export default function BlogView({ id }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  const onLike = (blog) => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const onComment = (event) => {
    event.preventDefault()

    if (event.target.comment.value < 3) {
      dispatch(
        showNotification({
          message: 'Please show some more effort. At least 3 charcaters.',
          variant: 'error',
        }),
      )
      return
    }

    const withComment = {
      ...blog,
      comments: [...blog.comments, event.target.comment.value],
    }

    dispatch(updateBlog(withComment))

    event.target.comment.value = ''
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card>
        <CardContent>
          <h2>
            {blog.title} {blog.author}
          </h2>
          <Link href={blog.url} className="url">
            {blog.url}
          </Link>
          <Box>likes {blog.likes}</Box>

          <p>added by {blog.user.name}</p>
        </CardContent>
        <CardActions>
          <Button endIcon="❤️" onClick={() => onLike(blog)}>
            like
          </Button>
          {user.username === blog.user.username && (
            <Button color="error" onClick={() => onDelete(blog)}>
              remove
            </Button>
          )}
        </CardActions>
      </Card>

      <Box>
        <Typography variant="h4">comments</Typography>
        <form onSubmit={onComment}>
          <TextField
            fullWidth
            type="text"
            name="comment"
            id="comment"
            autoComplete="off"
            autoCapitalize="off"
          />
          <Button type="submit">add comment</Button>
        </form>
        <List>
          {blog.comments.map((comment, index) => (
            <ListItem key={`${comment} ${index}`}>{comment}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
