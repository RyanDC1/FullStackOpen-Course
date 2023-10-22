import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
    query {
        getAuthors {
            data {
                id
                name
                born
                bookCount
            }
            count
      }
    }
`

export const GET_BOOKS = gql`
    query {
        getBooks {
            data {
                id
                title
                author
                published
                genres
            }
            count
        }
    }
`

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            id
            title
            author
            genres
            published
        }
  }
`

export const EDIT_AUTHOR = gql`
    mutation EditAuthor($id: String, $born: Int, $name: String) {
        editAuthor(id: $id, born: $born, name: $name) {
        id
        name
        born
        }
    }
`