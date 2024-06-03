const express = require('express')
const { Blog } = require('../models/blog.js')

const blogs = express.Router()

blogs.get('/api/blogs', async (_, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogs.post('/api/blogs', async (req, res) => {
  const defaults = { likes: 0 }
  const blog = await new Blog({ ...defaults, ...req.body }).save()

  res.status(201).json(blog)
})

blogs.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

blogs.put('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    // ensures we return the updated blog, by default mongoose returns the altered one
    new: true
  })

  res.json(blog)
})

module.exports = blogs
