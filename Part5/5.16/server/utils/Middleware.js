const logger = require('./Logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('\r\n---------------------\r\n')
    logger.info(new Date().toUTCString())
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Params:  ', request.params)
    logger.info('Body:  ', request.body)
    logger.info('\r\n---------------------\r\n')
    next()
}

const tokenEndpoint = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: "Invalid Token" })
        }
    }
    else {
        return response.status(401).json({ error: "Invalid Token" })
    }

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown Endpoint' })
    logger.error(`Request to ${request.path} responded in 404`)
}

const errorhandler = (error, request, response) => {
    logger.error(error.message)
    
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    return response.status(500).json({ error: 'Server could not process the request' })
}

module.exports = {
    requestLogger,
    tokenEndpoint,
    unknownEndpoint,
    errorhandler
}