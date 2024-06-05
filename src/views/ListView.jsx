import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { createBlog, deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { Toggle } from '../components/Toggle'
import { AddBlogForm } from '../components/AddBlogForm'
import Blog from '../components/Blog'

export default function ListView() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [isToggleVisible, setIsToggleVisible] = useState(false)
  const onLogout = () => {
    dispatch(logout())
  }

  const onLikeButtonClick = (blog) => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const onBlogDelete = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog, user.token))
    }
  }

  const onAddBlog = async ({ url, title, author }) => {
    const blog = { url, title, author, token: user.token }
    // dispatch is thenable but not a promise or an async function
    // we can return data from `createBlog` that will be used as return
    // value of dispatch
    dispatch(createBlog(blog)).then(
      (success) => success && setIsToggleVisible(false),
    )
  }

  return (
    <>
      <div>
        {user.name} logged in <button onClick={onLogout}>logout</button>
      </div>
      <Toggle
        open={isToggleVisible}
        onOpenChange={setIsToggleVisible}
        openPrompt="new blog"
        closePrompt="cancel"
      >
        <AddBlogForm
          user={user}
          handleSubmit={async (blog) => {
            onAddBlog(blog).then((success) => setIsToggleVisible(!success))
          }}
        />
      </Toggle>

      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            username={user.username}
            key={blog.id}
            blog={blog}
            handleLikeButtonClick={onLikeButtonClick}
            handleBlogDelete={onBlogDelete}
          />
        ))}
    </>
  )
}
