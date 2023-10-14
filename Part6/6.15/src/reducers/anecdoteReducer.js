import { createSlice } from "@reduxjs/toolkit"


const getId = () => crypto.randomUUID()

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    update(state, action) {
      return action.payload.sort((prev, next) => next.votes - prev.votes)
    },

    updateById(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
          return {
            ...action.payload
          }
        }
        return anecdote
      }).sort((prev, next) => next.votes - prev.votes)
    },

    add(state, action) {
      // redux toolkit uses immer to return
      // a new state on mutations
      state.push(action.payload)
      return state.sort((prev, next) => next.votes - prev.votes)
    }
  }
})

export default anecdoteSlice.reducer
export const { updateById, add, update } = anecdoteSlice.actions