const express = require('express')
const { Blog } = require('../models/blog.js')

const blogs = express.Router()

blogs.get('/api/blogs', async (_, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogs.post('/api/blogs', async (req, res) => {
  const blog = await new Blog(req.body).save()

  res.status(201).json(blog)
})

module.exports = blogs
