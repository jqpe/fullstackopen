const express = require('express')
const { User } = require('../models/user.js')
const { hash } = require('../utils/crypto.js')

const users = express.Router()

users.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    throw new TypeError('password should be at least 3 characters long')
  }

  const passwordHash = hash(password)

  const user = new User({
    username,
    name,
    passwordHash: passwordHash.toString('hex')
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

users.get('/', async (_, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    author: 1,
    id: 1
  })
  res.json(users)
})

module.exports = users
