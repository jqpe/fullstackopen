const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')

const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const { errorMiddleware } = require('./utils/middleware.js')

app.use(cors())
app.use(express.json())

app.use(usersRouter)
app.use(blogsRouter)

app.use(errorMiddleware)

module.exports = app
