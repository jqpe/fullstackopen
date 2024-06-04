import ReactDOM from 'react-dom/client'
import App from './App'

import { legacy_createStore as createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => root.render(<App store={store} />)

renderApp()
store.subscribe(renderApp)
