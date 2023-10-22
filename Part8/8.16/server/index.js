const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('./typedefs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/Users')

const MONGODB_URI = process.env.MONGO_URL

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// Resolvers should be defined in a service layer, this will be 
// taken up in later parts as we do not yet have a repository layer
const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    getBooks: async (root, args) => {
      let data = await Book.find({}).populate('author', { name: 1 })
      data = data.map(s => ({ ...s._doc, author: s._doc.author.name }))
      console.log(data)
      return {
        data,
        count: await Book.countDocuments()
      }
    },
    getAuthors: async () => {
      return {
        data: await Author.find({}),
        count: await Author.countDocuments()
      }
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root.name })
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        }) 
      }

      const author = args.author
      console.log(author)
      const authorExists = await Author.findOne({ name: author })
      let authorDetails = null
      console.log(authorExists)
      if (!authorExists) {
        const newAuthor = new Author({
          name: author.toString()
        })

        try {
          authorDetails = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError("Invalid_Request", {
            extensions: {
              code: 'BAD_REQUEST',
              invalidArgs: args.id,
              error
            }
          })
        }
      }
      else {
        authorDetails = authorExists
      }
      console.log(authorDetails)

      const book = new Book({
        title: args.title,
        published: args.published,
        author: authorDetails._id,
        genres: args.genres
      })
      try {
        return await book.save()
      } catch (error) {
        throw new GraphQLError("Invalid_Request", {
          extensions: {
            code: 'BAD_REQUEST',
            invalidArgs: args.id,
            error
          }
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        }) 
      }

      let author = await Author.findById(args.id)
      const { id, name = author.name, born = author.born } = args
      if (author) {
        author.name = name
        author.born = born
        try {
          return await author.save()
        } catch (error) {
          throw new GraphQLError("Invalid_Request", {
            extensions: {
              code: 'BAD_REQUEST',
              invalidArgs: args.id,
              error
            }
          })
        }
      }
      else {
        //return null
        throw new GraphQLError("Author not found", {
          extensions: {
            code: 'BAD_REQUEST',
            invalidArgs: args.id
          }
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs: [...typeDefs],
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})