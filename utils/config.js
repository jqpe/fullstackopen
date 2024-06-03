const MONGODB_URI = Object.freeze(
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
)

const PORT = parseInt(process.env.PORT) || 3003

const config = { MONGODB_URI, PORT }

module.exports = config
