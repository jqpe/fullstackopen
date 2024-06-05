import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LoginForm } from './components/LoginForm'

import { Notification } from './components/Notification'

import { initializeBlogs } from './reducers/blogsReducer'
import { login, logout } from './reducers/userReducer'

import { Route, Routes } from 'react-router-dom'
import './App.css'
import ListView from './views/ListView'
import UserView from './views/UserView'

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const onLogin = ({ username, password }) => {
    dispatch(login({ username, password }))
  }
  const onLogout = () => {
    dispatch(logout())
  }

  if (!user) {
    return (
      <>
        <h2>login to application</h2>

        <Notification />

        <LoginForm handleSubmit={onLogin} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in <button onClick={onLogout}>logout</button>
      </div>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/users" element={<UserView />} />
      </Routes>
    </div>
  )
}

export default App
