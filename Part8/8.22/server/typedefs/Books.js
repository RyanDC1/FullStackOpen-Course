const BookDTO = `
    _id: ID
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
`

const bookType = `
    type Book {
        ${BookDTO}
    }

    type Books {
        data: [Book]
        count: Int
    }

    type Query {
        getGenres: [String!]!
    }

    type Mutation {
        addBook(${BookDTO}): Book!
    }
`

module.exports = bookType