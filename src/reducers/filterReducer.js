const initialState = ''

const filterReducer = (state = initialState, action) => {
  if (action.type === 'CLEAR') {
    return initialState
  }

  if (action.type === 'SET') {
    return action.payload.filter
  }

  return state
}

export const clearFilter = () => ({ type: 'CLEAR' })
export const setFilter = filter => ({ type: 'SET', payload: { filter } })

export default filterReducer
