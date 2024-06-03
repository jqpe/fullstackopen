const { test, describe } = require('node:test')
const assert = require('node:assert')
const crypto = require('../utils/crypto.js')

describe('crypto', () => {
  test('is true when two hashes match', () => {
    const a = crypto.hash('a')
    assert(crypto.compare(a, 'a'))
  })
})
