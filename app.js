const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')

const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const middleware = require('./utils/middleware.js')

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorMiddleware)

module.exports = app
