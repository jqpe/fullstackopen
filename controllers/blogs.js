const express = require('express')

const { Blog } = require('../models/blog.js')
const { User } = require('../models/user.js')

const blogs = express.Router()

blogs.get('/', async (_, res) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
    id: 1
  })

  res.json(blogs)
})

blogs.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(req.user)

  const blog = await new Blog({ ...req.body, user: user.id }).save()
  const withUser = await blog.populate('user')
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  res.status(201).json(withUser)
})

blogs.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(req.params.id, { user: 1 })

  if (blog.user.toString() !== req.user) {
    res.status(401).json({ error: 'token invalid' })
  }

  await blog.deleteOne()
  return res.status(204).end()
})

blogs.put('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    // ensures we return the updated blog, by default mongoose returns the altered one
    new: true
  })
  const withUser = await blog.populate('user')

  res.json(withUser)
})

module.exports = blogs
