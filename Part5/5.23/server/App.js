const { MONGODB_URI, NODE_ENV } = require('./utils/Config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/Logger')
const blogController = require('./controllers/Blog')
const userController = require('./controllers/User')
const authController = require('./controllers/auth')
const { requestLogger, unknownEndpoint, errorhandler, tokenEndpoint } = require('./utils/Middleware')


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

//Configure Identity endpoint
app.use('/api/auth', authController)

//Testing endpoint
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

//#region init controller middlewares
app.use(tokenEndpoint)
NODE_ENV !== 'test' && app.use(requestLogger)


//Define router with default root route
app.use('/api/blogs', blogController)
app.use('/api/users', userController)

app.use(unknownEndpoint)
app.use(errorhandler)
//#endregion init controller middlewares

module.exports = app