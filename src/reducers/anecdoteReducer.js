import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  initialState: [],
  name: 'anecdotes',
  reducers: {
    incrementVote(state, action) {
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

export const { appendAnecdote, incrementVote, setAnecdotes } =
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

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(incrementVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer
