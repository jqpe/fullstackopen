// I chose not use the side-effect in models/people.js as that is considered
// a bad practise in almost all cases. E.g. what happens if we have multiple models
// and they all create their own connection?

const mongoose = require('mongoose')

/**
 * Connect to MongoDB with mongoose
 *
 * @param {string} [uri] optional MongoDB connection string, default: `process.env.MONGODB_URL`
 * @throws {Error} if database connection failed
 */
async function connect(uri) {
  try {
    await mongoose.connect(uri ?? process.env.MONGODB_URI)
    console.log('connected to database')
  } catch (e) {
    throw new Error(`database connection failed with error ${e.message}`)
  }
}

module.exports.connect = connect
