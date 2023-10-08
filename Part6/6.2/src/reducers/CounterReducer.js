const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

export const CounterTypes = {
  GOOD: 'GOOD',
  OK: 'OK',
  BAD: 'BAD',
  ZERO: 'ZERO'
}

const CounterReducer = (state = initialState, action) => {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case CounterTypes.GOOD:
      return { ...state, good: state.good + 1 }
    case CounterTypes.OK:
      return { ...state, ok: state.ok + 1 }
    case CounterTypes.BAD:
      return { ...state, bad: state.bad + 1 }
    case CounterTypes.ZERO:
      return initialState
    default: return state
  }

}

export default CounterReducer
