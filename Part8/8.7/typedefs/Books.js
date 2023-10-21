const BookDTO = `
    id: ID
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

    type Mutation {
        addBook(${BookDTO}): Book!
    }
`

module.exports = bookType