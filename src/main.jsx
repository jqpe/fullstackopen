import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.jsx'
import ApolloProvider from './providers/ApolloProvider.jsx'
import { AuthContextProvider } from './providers/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApolloProvider>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
