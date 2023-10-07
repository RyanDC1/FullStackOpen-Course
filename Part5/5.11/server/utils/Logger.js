const { NODE_ENV } = require("./Config")

const info = (...params) => {
    NODE_ENV !== 'test' && console.info(...params)
}

const error = (...params) => {
    NODE_ENV !== 'test' && console.error(...params)
}

module.exports = {
    info, 
    error
}