const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')

const blogsRouter = require('./controllers/blogs.js')

app.use(cors())
app.use(express.json())
app.use(blogsRouter)

module.exports = app
