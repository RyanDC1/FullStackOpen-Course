const AuthorDTO = `
    _id: ID
    name: String!
    born: Int
    bookCount: Int
`

const authorType = `
    type Author {
        ${AuthorDTO}
    }

    type Authors {
        data: [Author!]!
        count: Int!
    }

    type Mutation {
        editAuthor(id: String, name: String, born: Int): Author
    }
`

module.exports = authorType