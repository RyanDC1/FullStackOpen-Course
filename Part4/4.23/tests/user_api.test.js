const supertest = require('supertest')
const app = require('../App')
const mongoose = require('mongoose')

const User = require("../models/User")
const bcrypt = require('bcrypt')
const { users } = require('./user_helper')

const api = supertest(app)
const root = '/api/users'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVkc2dlciBXLiBEaWprc3RyYSIsImlkIjoiNDU0MjIxMjMxMjMzMTI3NjIzNGQxN2ZjIiwiaWF0IjoxNjk2NTMzOTg3fQ.qEHGU61ziufz39ktXmku4DizZNHTCxmtH2OAOmag7qc'

beforeEach(async () => {
    await User.deleteMany({})

    for (const user of users) {
        const newUser = new User(user)
        newUser.passwordHash = await bcrypt.hash(user.passwordHash, 10)
        await newUser.save()
    }
})

describe('Users test Create', () => {
    test.only('Get User List', async () => {
        const error = await api.get(root)
        .set('Authorization', token)
        .expect(200)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})