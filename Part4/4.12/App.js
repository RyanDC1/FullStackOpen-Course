const { MONGODB_URI, NODE_ENV } = require('./utils/Config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/Logger')
const blogController = require('./controllers/Blog')
const { requestLogger, unknownEndpoint, errorhandler } = require('./utils/Middleware')


//#region init express
app.use(cors())
app.use(express.json())
//#endregion init express


//#region init MongoDB
logger.info("Initializing MongoDB...")
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI).then(() => {
    logger.info("MongoDB Connected Successfully")
})
.catch((error) => {
    logger.error("MongoDB Connection Failure: ", error?.message)
})
//#endregion init MongoDB


//#region init controller middlewares
NODE_ENV !== 'test' && app.use(requestLogger)

//Define router with default root route
app.use('/api/blogs', blogController)

app.use(unknownEndpoint)
app.use(errorhandler)
//#endregion init controller middlewares

module.exports = app