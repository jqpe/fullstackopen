import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    clearFilter() {
      return initialState
    },
    setFilter(_, action) {
      return action.payload
    }
  }
})

export const { clearFilter, setFilter } = filterSlice.actions

export default filterSlice.reducer
