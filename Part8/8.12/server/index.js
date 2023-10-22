const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('./typedefs')
const crypto = require('crypto')
const { GraphQLError } = require('graphql')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

// Resolvers should be defined in a service layer, this will be 
// taken up in later parts as we do not yet have a repository layer
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    getBooks: (root, args) => {
      let data = books.filter(s => {
        let resolve = true
        if(args.author)
        {
          resolve = s.author.includes(args.author)
        }
        if(args.genre)
        {
          resolve = s.genres.includes(args.genre)
        }
        return resolve
      })

      return {
        data,
        count: books.length
      }
    },
    getAuthors: () => {
      return {
        data: authors,
        count: authors.length
      }
    }
  },

  Author: {
    bookCount: (root) => {
      return books.filter(s => s.author === root.name).length
    }
  },
  
  Mutation: {
    addBook: (root, args) => {
      const newBook = {...args, id: crypto.randomUUID()}
      const author = args.author
      if(!authors.find(s => s.name == author))
      {
        authors.push({
          id: crypto.randomUUID(),
          name: author
        })
      }
      books.push(newBook)
      return newBook
    },

    editAuthor: (root, args) => {
      const { id, ...updatedValues } = args
      const author = authors.find(s => s.id === id)
      if(author)
      {
        const updatedValue = { ...author, ...updatedValues }
        authors = authors.filter(s => s.id !== id)
        authors.push(updatedValue)
        return updatedValue
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
    }
  }
}

const server = new ApolloServer({
  typeDefs: [...typeDefs],
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})