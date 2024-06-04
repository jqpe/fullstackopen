import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, timeoutSecs = 5) => {
  return async dispatch => {
    dispatch(setNotification(message))
    await new Promise(resolve => setTimeout(resolve, timeoutSecs * 1000))
    dispatch(clearNotification())
  }
}
export default notificationSlice.reducer
