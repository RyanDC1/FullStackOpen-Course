import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
    query {
        getAuthors {
            data {
                _id
                name
                born
            }
            count
      }
    }
`

const BOOK_DETAILS = gql`
    fragment bookDetails on Book {
        _id
        title
        author
        published
        genres
    }
`

export const GET_BOOKS = gql`
    query getBooks($genres: [String]) {
        getBooks(genres: $genres) {
            data {
                ...bookDetails
            }
            count
        }
    }
    ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            ...bookDetails
        }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
    mutation EditAuthor($id: String, $born: Int, $name: String) {
        editAuthor(id: $id, born: $born, name: $name) {
        _id
        name
        born
        }
    }
`

export const AUTHORIZE = gql`
    query {
        me {
            username,
            favouriteGenre,
            _id
        }
    }
`

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const SET_FAVOURITE = gql`
    mutation SetFavourite($genre: String, $id: String) {
        setFavourite(genre: $genre, id: $id) {
        _id
        favouriteGenre
        username
        }
    }
`

export const GET_GENRES = gql`
    query Query {
        getGenres
    }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`