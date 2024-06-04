import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'message',
  reducers: {
    showNotification(state, action) {
      state = action.payload
    }
  }
})

export const { showNotification: show } = notificationSlice.actions
export default notificationSlice.reducer
