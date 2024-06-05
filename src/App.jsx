import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LoginForm } from './components/LoginForm'

import { Notification } from './components/Notification'

import { initializeBlogs } from './reducers/blogsReducer'
import { login, logout } from './reducers/userReducer'

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  Button,
  Avatar,
  Box,
  Tooltip,
} from '@mui/material'

import { Link as RouterLink, Route, Routes, useMatch } from 'react-router-dom'
import './App.css'
import ListView from './views/ListView'
import UserListView from './views/UserListView'
import UserView from './views/UserView'
import BlogView from './views/BlogView'

/**
 * Returns initials from name, up to limit (default 3).
 *
 * @param {string} name
 */
const getInitials = (name, limit = 3) => {
  const parts = name.split(' ')
  let initials = ''

  for (const part of parts.slice(0, limit)) {
    if (part.length > 0 && part !== '') {
      initials += part[0]
    }
  }
  return initials
}

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const userMatch = useMatch('/user/:id')
  const userId = userMatch ? userMatch.params.id : null

  const blogMatch = useMatch('/blogs/:id')
  const blogId = blogMatch ? blogMatch.params.id : null

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
      <Container maxWidth="md" sx={{ mb: 'auto' }}>
        <h2>login to application</h2>

        <Notification />

        <LoginForm handleSubmit={onLogin} />
      </Container>
    )
  }

  return (
    <main>
      <AppBar variant="elevation" position="sticky" color="default">
        <Container maxWidth="md">
          <Toolbar
            variant="dense"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', gap: '.5rem' }}>
              <Link component={RouterLink} to="/" color="inherit">
                blogs
              </Link>
              <Link component={RouterLink} to="/users" color="inherit">
                users
              </Link>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Tooltip title={`${user.name} logged in`}>
                <Avatar>{getInitials(user.name)}</Avatar>
              </Tooltip>

              <Button onClick={onLogout}>logout</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md">
        <Typography variant="h2">blogs</Typography>
        <Notification />
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/users" element={<UserListView />} />
          <Route path="/user/:id" element={<UserView id={userId} />} />
          <Route path="/blogs/:id" element={<BlogView id={blogId} />} />
        </Routes>
      </Container>
    </main>
  )
}

export default App
