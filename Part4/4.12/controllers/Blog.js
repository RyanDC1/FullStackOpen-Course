const Blog = require('../models/Blog')
const blogController = require('express').Router()
const _ = require('lodash')

blogController.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogController.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blogs => {
            response.json(blogs)
        })
})

blogController.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if(_.isEmpty(request.body.title) || _.isEmpty(request.body.url))
    {
        return response.status(400).end()
    }

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogController