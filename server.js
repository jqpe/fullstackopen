const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')

const Book = require('./models/book.js')
const Author = require('./models/author.js')
const { GraphQLError } = require('graphql')

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
      const params = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author }, { id: 1 })
        if (!author) {
          throw new GraphQLError('no author with name', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,

            }
          })
        }
        params['author'] = author._id
      }
      if (args.genre) {
        params['genres'] = args.genre
      }

      return Book.find(params).populate('author')
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
    async bookCount(root) {
      return await Book.countDocuments({ author: root._id })
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
