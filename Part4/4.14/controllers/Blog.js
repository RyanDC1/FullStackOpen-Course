const Blog = require('../models/Blog')
const blogController = require('express').Router()
const _ = require('lodash')
require('express-async-errors');

blogController.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogController.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(blog != null)
    {
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

blogController.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(_.isEmpty(request.body.title) || _.isEmpty(request.body.url))
    {
        return response.status(400).end()
    }

    const result = await blog.save()
    response.status(201).json(result)
})

blogController.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    if(blog == null)
    {
        return response.status(404).end()
    }
    response.status(204).end()
})

blogController.put('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
    if(blog == null)
    {
        return response.status(404).end()
    }
    response.json(blog)
})

module.exports = blogController