const Blog = require('../models/Blog')
const User = require('../models/User');
const blogController = require('express').Router()
const _ = require('lodash');
const { getUserSession } = require('../utils/helper');
require('express-async-errors');

blogController.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { name: 1, id: 1 })
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
    const { username, id } = getUserSession(request.get('authorization'))

    const author = await User.findById(id)
    
    const blog = new Blog({
        ...request.body,
        user: author.id
    })

    if(_.isEmpty(request.body.title) || _.isEmpty(request.body.url))
    {
        return response.status(400).end()
    }

    const result = await blog.save()
    
    author.blogs = author.blogs.concat(result.id)
    await author.save()

    response.status(201).json(result)

})

blogController.delete('/:id', async (request, response) => {
    const { username, id } = getUserSession(request.get('authorization'))
    const author = await User.findById(id)

    const blogIds = author.blogs.map(s => s.toString())

    if(blogIds.includes(request.params.id))
    {
        const blog = await Blog.findByIdAndDelete(request.params.id)
        if(blog == null)
        {
            return response.status(404).end()
        }
        response.status(204).end()
        author.blogs = author.blogs.filter(blog => blog.toString() !== request.params.id)
        await author.save()
    }
    else {
        response.status(401).end()
    }

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