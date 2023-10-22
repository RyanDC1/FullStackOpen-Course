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

export const GET_BOOKS = gql`
    query getBooks($genres: [String]) {
        getBooks(genres: $genres) {
            data {
                _id
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
            _id
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