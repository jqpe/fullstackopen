const mongoose = require('mongoose')

const app = require('./app.js')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')

mongoose.connect(config.MONGODB_URI)

const PORT = config.PORT
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
