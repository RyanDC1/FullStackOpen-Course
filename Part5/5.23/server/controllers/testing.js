const Blog = require('../models/Blog')
const User = require('../models/User');
const testController = require('express').Router()
const _ = require('lodash');
require('express-async-errors');

testController.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(201).end()
})

module.exports = testController