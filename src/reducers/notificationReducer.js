import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', variant: 'success' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.variant = action.payload.variant
    },
    clearNotification() {
      return initialState
    },
  },
})

export const { clearNotification, setNotification } = notificationSlice.actions

export const showNotification = ({ message, variant }, timeoutSecs = 5) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, variant }))
    await new Promise((resolve) => setTimeout(resolve, timeoutSecs * 1000))
    dispatch(clearNotification())
  }
}

export default notificationSlice.reducer
