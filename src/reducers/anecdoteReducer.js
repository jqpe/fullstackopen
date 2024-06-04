import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100_000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  initialState: [],
  name: 'anecdotes',
  reducers: {
    voteAnecdote(state, action) {
      const note = state.findIndex(({ id }) => id === action.payload)
      state[note] = { ...state[note], votes: state[note].votes + 1 }
    },
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export default anecdoteSlice.reducer
