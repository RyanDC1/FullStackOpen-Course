const jwt = require('jsonwebtoken')

const getUserSession = (token) => {
    return jwt.decode(token.replace('Bearer ', ''))
}

module.exports = {
    getUserSession
}