const { test, after, before, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require('../app.js')
const config = require('../utils/config.js')
const { Blog } = require('../models/blog.js')

const api = supertest(app)

const ID = mongoose.Types.ObjectId.createFromBase64('test--test--test')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    _id: ID
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  await new Blog(initialBlogs[0]).save()
  await new Blog(initialBlogs[1]).save()
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
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const body = { ...response.body }
  // another way would be to send the id with the request
  delete body.id

  assert.deepEqual(body, newBlog)

  const blogs = await Blog.find({})
  assert.strictEqual(blogs.length, 3)
})

test('likes default to 0 if not present', async () => {
  const newBlog = { ...initialBlogs[1], title: 'another one!' }
  delete newBlog.likes

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const body = { ...response.body }
  // another way would be to send the id with the request
  delete body.id

  assert.deepEqual(body, { ...newBlog, likes: 0 })
})

after(async () => {
  await mongoose.connection.close()
})
