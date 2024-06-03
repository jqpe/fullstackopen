const logger = require('./logger')

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

  next(error)
}

module.exports = { errorMiddleware }
