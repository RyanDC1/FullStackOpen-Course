import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import { CounterReducer, CounterTypes } from './reducers'

//Using create store for the purpose of this exercise
const store = createStore(CounterReducer)


const App = () => {

  // this will be moved to actions in later parts
  const incrementCounter = (type) => {
    store.dispatch({
      type
    })
  }

  const { good, bad, ok } = store.getState()

  return (
    <div>
      <button onClick={() => incrementCounter(CounterTypes.GOOD)}>good</button> 
      <button onClick={() => incrementCounter(CounterTypes.OK)}>ok</button> 
      <button onClick={() => incrementCounter(CounterTypes.BAD)}>bad</button>
      <button onClick={() => incrementCounter(CounterTypes.ZERO)}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

// Defining stores in same file as contexts will be used at a later point
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
