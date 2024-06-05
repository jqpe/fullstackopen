import { Box, Button, FormLabel, Typography } from '@mui/material'
import { useState } from 'react'

export function AddBlogForm({ user, handleSubmit }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  if (!user) return null

  return (
    <Box>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit({ title, author, url })
        }}
      >
        <Typography variant="h3">create new blog</Typography>
        <FormInput name="name" setValue={setTitle} value={title} />
        <FormInput name="author" setValue={setAuthor} value={author} />
        <FormInput name="url" setValue={setUrl} value={url} />

        <Button type="submit">create</Button>
      </form>
    </Box>
  )
}
function FormInput({ value, setValue, name }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormLabel id={name}>{name}</FormLabel>
      <input
        type="text"
        value={value}
        id={name}
        name={name}
        onChange={({ target }) => setValue(target.value)}
      />
    </Box>
  )
}
