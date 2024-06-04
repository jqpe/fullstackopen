import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(_state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
