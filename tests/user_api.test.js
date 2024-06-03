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

test('can create a new user', async () => {
  const user = { name: 'Milla Marttila', username: 'milli', password: 'test' }
  const res = await api.post('/api/users/').send(user).expect(201)

  assert(res.body.username)
  assert(res.body.name)
  assert(res.body.id)

  assert(!res.body.passwordHash)

  const users = await User.find({})

  assert.strictEqual(users.length, 1)
})

test('can get a list of users', async () => {
  await new User({
    name: 'Milla Marttila',
    username: 'milli',
    passwordHash: 'test'
  }).save()

  const res = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.length, 1)
  assert(res.body[0].name)
  assert(res.body[0].username)
  assert(res.body[0].id)
})

test('responds with status 400 if username is less than 3 chars', async () => {
  assert('💩'.length === 2)
  const user = { username: '💩', password: 'test' }
  const res = await api.post('/api/users/').send(user).expect(400)

  assert(/validation failed/.test(res.body.error))
})

test('responds with status 400 if password is less than 3 chars', async () => {
  assert('💩'.length === 2)
  const user = { username: 'milla', password: '💩' }
  const res = await api.post('/api/users/').send(user).expect(400)
  assert.deepStrictEqual(res.body, {
    error: 'password should be at least 3 characters long'
  })
})

test('username must be unique', async () => {
  await new User({
    name: 'Milla Marttila',
    username: 'milli',
    passwordHash: 'test'
  }).save()

  const user = { name: 'Kyösti Pöysti', username: 'milli', password: 'test' }
  const res = await api.post('/api/users/').send(user).expect(400)

  assert(/expected `username` to be unique/.test(res.body.error))
})

after(async () => {
  await mongoose.connection.close()
})
