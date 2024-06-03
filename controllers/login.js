const jwt = require('jsonwebtoken')
const express = require('express')

const { compare } = require('../utils/crypto.js')
const { User } = require('../models/user.js')
const config = require('../utils/config.js')

const login = express.Router()

login.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user && compare(user.passwordHash, password)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.HASH)

  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = login
