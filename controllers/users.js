const express = require('express')
const { User } = require('../models/user.js')
const crypto = require('node:crypto')
const config = require('../utils/config.js')

const users = express.Router()

users.post('/api/users', async (req, res) => {
  const { username, name, password } = req.body

  const passwordHash = crypto.scryptSync(password, config.HASH, 64)

  const user = new User({
    username,
    name,
    passwordHash: passwordHash.toString('hex')
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

users.get('/api/users', async (_, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = users
