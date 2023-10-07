const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: [3, 'username must be atleast 3 characters']
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

const transform = (document, properties) => {
    properties.id = properties._id.toString()
    delete properties._id
    delete properties.__v
}

userSchema.set('toJSON', {
    transform: (document, properties) => {
        transform(document, properties)
        // delete passwordHash, this also needs to 
        // be excluded in controller by passing a param ' -passwordHash'
        // which will prevent it from being saved in memory
        delete properties.passwordHash
    }
})

userSchema.set('toObject', {
    transform: transform
})

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, { message: 'username already taken, please try a different one' });

const User = mongoose.model('User', userSchema)
module.exports = User