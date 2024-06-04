import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)
