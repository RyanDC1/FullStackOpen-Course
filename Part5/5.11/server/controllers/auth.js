const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const _ = require('lodash')
const authController = require('express').Router()

authController.post('/register', async (request, response) => {
    const user = new User(request.body)

    if(user.passwordHash?.length < 3)
    {
        return response.status(400).json({
            error: "Password must be atleast 3 characters"
        })
    }

    user.passwordHash = !_.isEmpty(user.passwordHash) ? await bcrypt.hash(user.passwordHash, 10) : undefined

    try {
        const newUser = await user.save()
        response.json(newUser)
    } catch (error) {
        logger.error(error.message)
        response.status(400).json({
            error: error.message
        })
    }
})

authController.post('/login', async (request, response) => {
    const { username, password } = request.body

    if (_.isEmpty(username)) {
        return response.status(400).json({
            error: 'username required'
        })
    }

    if (_.isEmpty(password)) {
        return response.status(400).json({
            error: 'password required'
        })
    }

    const user = await User.findOne({ username })

    if (user === null) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)

    if (!validPassword) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        name: user.name,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = authController