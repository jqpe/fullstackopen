const { test, after, before, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const jwt = require('jsonwebtoken')

const app = require('../app.js')
const config = require('../utils/config.js')
const { Blog } = require('../models/blog.js')
const { User } = require('../models/user.js')
const { passwordHash } = require('../utils/crypto.js')

const api = supertest(app)

const ID = mongoose.Types.ObjectId.createFromBase64('test--test--test')
const USER_ID = mongoose.Types.ObjectId.createFromBase64('test--user--test')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    _id: ID,
    user: USER_ID
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const authHeaders = [
  'Authorization',
  `Bearer ${jwt.sign(
    {
      username: 'testing-bearer',
      id: USER_ID
    },
    config.HASH
  )}`
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await new Blog(initialBlogs[0]).save()
  await new Blog(initialBlogs[1]).save()

  await new User({
    username: 'testing-bearer',
    passwordHash: passwordHash('test'),
    _id: USER_ID
  }).save()
})

before(async () => {
  await mongoose.connect(config.MONGODB_URI)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('_id is available under id key', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body[0].id, ID.toString())
})

test('submitting works', async () => {
  const newBlog = { ...initialBlogs[1], title: 'another one!' }

  const response = await api
    .post('/api/blogs')
    .set(...authHeaders)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const body = { ...response.body }
  // another way would be to send the id with the request
  delete body.id
  delete body.user

  assert.deepEqual(body, newBlog)

  const blogs = await Blog.find({})
  assert.strictEqual(blogs.length, 3)
})

test('likes default to 0 if not present', async () => {
  const newBlog = { ...initialBlogs[1], title: 'another one!' }
  delete newBlog.likes

  const response = await api
    .post('/api/blogs')
    .set(...authHeaders)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const body = { ...response.body }
  // another way would be to send the id with the request
  delete body.id
  delete body.user

  assert.deepEqual(body, { ...newBlog, likes: 0 })
})

test('responds with status 400 if title is missing', async () => {
  const newBlog = { ...initialBlogs[1] }
  delete newBlog.title

  await api
    .post('/api/blogs')
    .set(...authHeaders)
    .send(newBlog)
    .expect(400)
})

test('responds with status 400 if url is missing', async () => {
  const newBlog = { ...initialBlogs[1] }
  delete newBlog.url

  await api
    .post('/api/blogs')
    .set(...authHeaders)
    .send(newBlog)
    .expect(400)
})

test.only('can delete a blog', async () => {
  // just to be sound
  assert.strictEqual(initialBlogs.length, 2)

  await api
    .delete(`/api/blogs/${ID}`)
    .set(...authHeaders)
    .expect(204)

  const blogs = await Blog.find({})

  assert.strictEqual(blogs.length, 1)
})

test('can update a blog', async () => {
  const newBlog = { ...initialBlogs[0], likes: 200_000 }
  const response = await api.put(`/api/blogs/${ID}`).send(newBlog).expect(200)

  const body = { ...response.body }
  delete body.id
  delete body.user
  delete newBlog._id
  delete newBlog.user

  assert.deepStrictEqual(body, newBlog)

  const blog = await Blog.findById(ID)

  assert.strictEqual(blog.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
