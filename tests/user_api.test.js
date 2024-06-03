const { test, after, before, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require('../app.js')
const config = require('../utils/config.js')
const { User } = require('../models/user.js')

const api = supertest(app)

before(async () => {
  await mongoose.connect(config.MONGODB_URI)
})

beforeEach(async () => {
  await User.deleteMany({})
})

test.only('can create a new user', async () => {
  const user = { name: 'Milla Marttila', username: 'milli', password: 'test' }
  const res = await api.post('/api/users/').send(user).expect(201)

  assert(res.body.username)
  assert(res.body.name)
  assert(res.body.id)

  assert(!res.body.passwordHash)

  const users = await User.find({})

  assert.strictEqual(users.length, 1)
})

after(async () => {
  await mongoose.connection.close()
})
