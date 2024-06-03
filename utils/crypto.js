const config = require('./config.js')
const crypto = require('node:crypto')

const hash = password => {
  return crypto.scryptSync(password, config.HASH, 64)
}

const passwordHash = password => {
  return hash(password).toString('hex')
}

/**
 * @param {string} passwordHash Hex encoded buffer
 * @param {string} password Raw password
 */
const compare = (passwordHash, password) => {
  const original = Buffer.from(passwordHash, 'hex')
  const pass = hash(password)

  return crypto.timingSafeEqual(original, pass)
}

module.exports = { hash, compare, passwordHash }
