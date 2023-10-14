import { AnecdoteActions } from "./actions/AnecdoteActions"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => crypto.randomUUID()

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  let updatedState = null

  switch (action.type) {
    case AnecdoteActions.VOTE: {
      updatedState = state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
      break
    }

    case AnecdoteActions.CREATE: {
      updatedState = state.concat(action.payload)
      break
    }

    default:
      updatedState = state
  }

  return updatedState.sort((prev, next) => next.votes - prev.votes)
}