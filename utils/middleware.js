const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config.js')

const errorMiddleware = (error, _, res, next) => {
  logger.error(error)

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  if (error instanceof TypeError) {
    return res.status(400).send({ error: error.message })
  }

  if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const tokenExtractor = (req, _, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = (req, _, next) => {
  const decodedToken = req.token && jwt.verify(req.token, config.HASH)

  req.user = decodedToken?.id ? decodedToken.id : null

  next()
}

module.exports = { errorMiddleware, tokenExtractor, userExtractor }
