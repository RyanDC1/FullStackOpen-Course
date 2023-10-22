const queryType = `
    type Query {
        bookCount: Int!
        authorCount: Int!
        getBooks(genres: [String]): Books!
        getAuthors: Authors!
    }
`

module.exports = queryType