import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import { showNotification } from './notificationReducer'
import { AxiosError } from 'axios'

const getPersistedUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem('user'))
  } catch {
    return null
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: getPersistedUser(),
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

const { setUser, clearUser } = userSlice.actions

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await userService.login({ username, password })
      const user = response.data

      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))

      dispatch(
        showNotification({
          message: `welcome back ${user.name}!`,
          variant: 'success',
        }),
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          showNotification({
            message: error.response.data.error,
            variant: 'error',
          }),
        )
      }
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user')
    dispatch(clearUser())
  }
}

export default userSlice.reducer
