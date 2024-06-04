import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    clearFilter() {
      return initialState
    },
    setFilter(_, payload) {
      return payload.filter
    }
  }
})

export const { clearFilter, setFilter } = filterSlice.actions

export default filterSlice.reducer
