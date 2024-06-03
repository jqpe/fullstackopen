const express = require('express')
const jwt = require('jsonwebtoken')

const { Blog } = require('../models/blog.js')
const { User } = require('../models/user.js')
const config = require('../utils/config.js')

const blogs = express.Router()

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogs.get('/', async (_, res) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
    id: 1
  })

  res.json(blogs)
})

blogs.post('/', async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), config.HASH)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await new Blog({ ...req.body, user: user.id }).save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  res.status(201).json(blog)
})

blogs.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

blogs.put('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    // ensures we return the updated blog, by default mongoose returns the altered one
    new: true
  })

  res.json(blog)
})

module.exports = blogs
