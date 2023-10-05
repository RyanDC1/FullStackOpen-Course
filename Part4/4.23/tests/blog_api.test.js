const supertest = require('supertest')
const app = require('../App')
const mongoose = require('mongoose')
const { getRandomId, getTotal, getRandomBlog, blogs } = require('./blog_helper')
const Blog = require('../models/Blog')
require('./blog_helper')

const api = supertest(app)
const root = '/api/blogs'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVkc2dlciBXLiBEaWprc3RyYSIsImlkIjoiNDU0MjIxMjMxMjMzMTI3NjIzNGQxN2ZjIiwiaWF0IjoxNjk2NTMzOTg3fQ.qEHGU61ziufz39ktXmku4DizZNHTCxmtH2OAOmag7qc'

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of blogs) {
        const newBlog = new Blog(blog)
        await newBlog.save()
    }
})

describe('Blog Test Retrieve', () => {
    test('Get List', async () => {
        const blogs = await api.get(root)
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(blogs.body).toHaveLength(getTotal())
    })

    test('Get Blog - Check if id exists', async () => {
        const blogId = getRandomId()

        const blog = await api.get(`${root}/${blogId}`)
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        expect(blog?.body?.id).toBeDefined()
    })
})

describe('Blog Test Create', () => {
    test('Create Blog', async () => {
        const newBlog = new Blog({
            title: "TypeScript Function Syntaxes",
            url: "https://kentcdodds.com/blog/typescript-function-syntaxes",
            likes: 5
        }).toObject()

        const blog = await api.post(root).send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const updatedList = await api.get(root)
        .set('Authorization', token)
        const createdBlog = updatedList.body.find(s => s.id === blog.body.id)

        expect(updatedList.body).toHaveLength(getTotal() + 1)
        expect(createdBlog.id.toString()).toEqual(newBlog.id.toString())
    })

    test('Create Blog - with "likes" as undefined', async () => {
        const newBlog = new Blog({
            title: "TypeScript Function Syntaxes",
            url: "https://kentcdodds.com/blog/typescript-function-syntaxes"
        }).toObject()

        const blog = await api.post(root).send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const createdBlog = await api.get(`${root}/${blog.body.id}`)
        .set('Authorization', token)

        expect(createdBlog.body.likes).toBe(0)
    })

    test('Create Blog - with "title" as undefined', async () => {
        const newBlog = new Blog({
            url: "https://kentcdodds.com/blog/typescript-function-syntaxes",
            likes: 5
        }).toObject()

        await api.post(root).send(newBlog)
        .set('Authorization', token)
        .expect(400)
    })

    test('Create Blog - with "url" as undefined', async () => {
        const newBlog = new Blog({
            title: "TypeScript Function Syntaxes",
            likes: 5
        }).toObject()

        await api.post(root).send(newBlog)
        .set('Authorization', token)
        .expect(400)
    })

    test('Create Blog - without authorization token', async () => {
        const newBlog = new Blog({
            title: "TypeScript Function Syntaxes",
            url: "https://kentcdodds.com/blog/typescript-function-syntaxes",
            likes: 5,
        }).toObject()

        const blog = await api.post(root).send(newBlog)
        .expect(401)
    })
})

describe('Blog Test Delete', () => {
    test('Delete blog', async () => {
        const blogId = getRandomId()
        await api.delete(`${root}/${blogId}`)
        .set('Authorization', token)
        .expect(204)

        await api.get(`${root}/${blogId}`)
        .set('Authorization', token)
        .expect(404)
    })

    test('Delete blog - that does not exist (does not belong to user)', async () => {
        const blogId = '5a422b641b54a146234d17f9'
        await api.delete(`${root}/${blogId}`)
        .set('Authorization', token)
        .expect(401)
    })
})

describe('Blog Test Update', () => {
    test('Update blog', async () => {
        let blog = getRandomBlog()
        blog = {
            ...blog,
            likes: blog.likes + 1
        }

        await api.put(`${root}/${blog.id}`).send(blog)
        .set('Authorization', token)
        .expect(200)

        const updatedBlog = await api.get(`${root}/${blog.id}`)
        .set('Authorization', token)
        expect(updatedBlog.body.likes).toBe(blog.likes)
    })

    test('Update blog - that does not exist', async () => {
        let blog = getRandomBlog()
        let blogId = '651a5f6cd9edf5b6fba45ed2'
        blog = {
            ...blog,
            id: blogId,
            likes: blog.likes + 1
        }

        await api.put(`${root}/${blog.id}`).send(blog)
        .set('Authorization', token)
        .expect(404)

        // Make sure blog does not get created if absent
        await api.get(`${root}/${blogId}`)
        .set('Authorization', token)
        .expect(404)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})