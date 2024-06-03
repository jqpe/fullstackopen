const { test, after, before, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require('../app.js')
const config = require('../utils/config.js')
const { User } = require('../models/user.js')
const { passwordHash } = require('../utils/crypto.js')

const api = supertest(app)

before(async () => {
  await mongoose.connect(config.MONGODB_URI)
})

beforeEach(async () => {
  await User.deleteMany({})

  await new User({
    passwordHash: passwordHash('test'),
    name: 'cool name',
    username: 'superman'
  }).save()
})

describe('login api', () => {
  test('successful login yields a token', async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'superman', password: 'test' })
      .expect(200)

    assert(res.body.token)
  })

  test('responds with status 401 if password is wrong', async () => {
    await api
      .post('/api/login')
      .send({ username: 'superman', password: 'this is not it 💩' })
      .expect(401)
  })

  test('responds with status 401 if username does not exist', async () => {
    await api
      .post('/api/login')
      .send({ username: 'this does not exist', password: 'test' })
      .expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})
