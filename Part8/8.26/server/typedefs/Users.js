const UserType = `
    type User {
        username: String!
        favouriteGenre: [String!]!
        _id: ID!
    }
    
    type Token {
        value: String!
    }
    
    type Query {
        me: User
    }
    
    type Mutation {
        createUser(
        username: String!
        ): User

        login(
        username: String!
        password: String!
        ): Token

        setFavourite(genre: String, id: String): User
    }
`
module.exports = UserType
