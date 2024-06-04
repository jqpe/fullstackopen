import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  initialState: [],
  name: 'anecdotes',
  reducers: {
    voteAnecdote(state, action) {
      const note = state.findIndex(({ id }) => id === action.payload)
      state[note] = { ...state[note], votes: state[note].votes + 1 }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdotes = await anecdoteService.create({ content, votes: 0 })
    dispatch(appendAnecdote(anecdotes))
  }
}

export default anecdoteSlice.reducer
