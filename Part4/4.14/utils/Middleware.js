const logger = require('./Logger')

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

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown Endpoint' })
    logger.error(`Request to ${request.path} responded in 404`)
}

const errorhandler = (error, request, response) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    return response.status(500).json({ error: 'Server could not process the request' })
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorhandler
}