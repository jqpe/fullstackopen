const logger = require('./logger')

const errorMiddleware = (error, _, res, next) => {
  logger.error(error)

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  if (error instanceof TypeError) {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = { errorMiddleware }
