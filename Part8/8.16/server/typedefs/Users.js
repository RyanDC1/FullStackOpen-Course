const UserType = `
    type User {
        username: String!
        id: ID!
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
    }
`
module.exports = UserType
