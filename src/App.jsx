import { Link, Route, Routes } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <>
      <nav style={{ display: 'flex', gap: 10 }}>
        <Link to="/authors">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/new-book">new book</Link>
      </nav>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/new-book" element={<NewBook />} />
      </Routes>
    </>
  )
}

export default App
