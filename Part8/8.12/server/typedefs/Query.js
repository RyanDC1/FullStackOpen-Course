const queryType = `
    type Query {
        bookCount: Int!
        authorCount: Int!
        getBooks(author: String, genre: String): Books!
        getAuthors: Authors!
    }
`

module.exports = queryType