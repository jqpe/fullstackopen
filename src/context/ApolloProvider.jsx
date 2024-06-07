import {
  ApolloClient,
  ApolloProvider as _ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { useContext } from 'react'
import AuthContext from './AuthContext'

export default function ApolloProvider({ children }) {
  const user = useContext(AuthContext)

  const authLink = setContext((_, { headers }) => {
    const token = user.token
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }
  })

  const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }))
  const httpLink = createHttpLink({ uri: 'http://localhost:4000' })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink)
  )

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  })

  return <_ApolloProvider client={client}>{children}</_ApolloProvider>
}
