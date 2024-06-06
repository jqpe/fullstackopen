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
      title
      author
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
