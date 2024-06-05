import { useState } from 'react'

export function AddBlogForm({ user, handleSubmit }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  if (!user) return null

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit({ title, author, url })
        }}
      >
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
