const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')

const Book = require('./models/book.js')
const Author = require('./models/author.js')

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.error('error connection to MongoDB:', error.message)
    process.exit(1)
  })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const matchAuthor = books => {
        return books.filter(({ author }) => author === args.author)
      }
      const matchGenre = books => {
        return books.filter(({ genres }) => genres.includes(args.genre))
      }

      switch (true) {
        case args.author && args.genre:
          return [].filter(matchAuthor).filter(matchGenre)
        case !!args.author:
          return [].filter(matchAuthor)
        case !!args.genre:
          return [].filter(matchGenre)

        default:
          return Book.find({})
      }
    },
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    addBook: async (_, args) => {
      // creates the author if it doesn't exist yet, otherwise just returns it
      const author = await Author.findOneAndUpdate(
        { name: args.author },
        {},
        { upsert: true, new: true }
      )
      const book = await Book.create({ ...args, author: author._id })

      return book
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )

      return author
    }
  },
  Author: {
    async bookCount() {
      throw new TypeError('unimplemented')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
