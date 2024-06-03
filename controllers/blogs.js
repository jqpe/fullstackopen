const express = require('express')
const { Blog } = require('../models/blog.js')

const blogs = express.Router()

blogs.get('/api/blogs', (_, res) => {
  Blog.find({}).then(blogs => res.json(blogs))
})

blogs.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => res.status(201).json(result))
})

module.exports = blogs
