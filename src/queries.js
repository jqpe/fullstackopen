import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      genres
      title
      author {
        name
      }
      published
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      name
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const RECOMMENDATIONS = gql`
  query {
    me {
      favoriteGenre
    }
    allBooks {
      genres
      title
      author {
        name
      }
      published
    }
  }
`
