const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs.js')
const logger = require('./utils/logger.js')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
