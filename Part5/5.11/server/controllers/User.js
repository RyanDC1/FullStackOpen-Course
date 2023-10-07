const User = require('../models/User')
const userController = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
require('express-async-errors');
const logger = require('../utils/Logger')

const excludedProperties = '-passwordHash'

userController.get('/', async (request, response) => {
    const users = await User.find({}, excludedProperties).populate('blogs', { 
        title: 1, 
        url: 1, 
        likes: 1, 
        id: 1 
    })
    response.json(users)
})

module.exports = userController