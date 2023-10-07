const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const transformId = (document, properties) => {
  properties.id = properties._id.toString()
  delete properties._id
  delete properties.__v
}

blogSchema.set('toJSON', {
    transform: transformId
})

blogSchema.set('toObject', {
  transform: transformId
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog