const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Book = require('./models/book.js')
const Author = require('./models/author.js')
const User = require('./models/user.js')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const params = {}
      if (args.author) {
        if (args.author.length < 4) {
          throw badUserInput(
            'author needs to be at least 4 characters long',
            args.author
          )
        }
        const author = await Author.findOne({ name: args.author }, { id: 1 })
        if (!author) {
          throw badUserInput('no author with name', args.author)
        }
        params['author'] = author._id
      }
      if (args.genre) {
        params['genres'] = args.genre
      }

      return Book.find(params).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: async (_, __, context) => {
      // we could create a user named "undefined" and view it's data
      // without credentials
      if (context.currentUser) {
        return null
      }

      return await User.findOne({ username: context.currentUser?.username })
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('requires credentials', {
          extensions: { code: 'BAD_AUTH' }
        })
      }

      if (args.author.length < 4) {
        throw badUserInput(
          'author needs to be at least 4 characters long',
          args.author
        )
      }

      if (args.title.length < 5) {
        throw badUserInput(
          'title needs to be at least 5 characters long',
          args.title
        )
      }

      // creates the author if it doesn't exist yet, otherwise just returns it
      const author = await Author.findOneAndUpdate(
        { name: args.author },
        {},
        { upsert: true, new: true }
      )
      const book = await Book.create({ ...args, author: author._id })

      return book
    },
    editAuthor: async (_, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('requires credentials', {
          extensions: { code: 'BAD_AUTH' }
        })
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )

      return author
    },
    createUser: async (_, args) => {
      try {
        return await User.create({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
      } catch (error) {
        if (/expected `username` to be unique/.test(error.errors.username)) {
          throw badUserInput('username is already in use', args.username)
        }

        throw badUserInput('can not create user', args.username, error)
      }
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw badUserInput('invalid credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Author: {
    async bookCount(root) {
      return await Book.countDocuments({ author: root._id })
    }
  }
}

const badUserInput = (message, arg, error) => {
  return new GraphQLError(message, {
    extensions: {
      code: 'BAD_USER_INPUT',
      invalidArgs: arg,
      error
    }
  })
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.replace('Bearer ', ''),
        process.env.JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
