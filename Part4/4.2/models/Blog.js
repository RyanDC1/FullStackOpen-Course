const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, properties) => {
        properties.id = properties._id.toString()
        delete properties._id
        delete properties.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog