const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config.js')
const blogs = require('./controllers/blogs.js')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(blogs)

const PORT = config.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
