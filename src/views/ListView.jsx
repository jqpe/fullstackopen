import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AddBlogForm } from '../components/AddBlogForm'
import Blog from '../components/Blog'
import { Toggle } from '../components/Toggle'
import { createBlog } from '../reducers/blogsReducer'

export default function ListView() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [isToggleVisible, setIsToggleVisible] = useState(false)

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
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )
}
