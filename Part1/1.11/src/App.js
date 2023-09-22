import { useState } from 'react'
import { FeedbackActions, Header, Statistics } from './components'
import { FeedbackValues } from './utils/constants'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header title="Give Feedback"/>
      <FeedbackActions onFeedbackClick={setFeedback}/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )

  function setFeedback(value) {

    // get evaluator based on value
    const setFeedbackValue = {
      [FeedbackValues.GOOD]: () => setGood(count => count + 1),
      [FeedbackValues.NEUTRAL]: () => setNeutral(count => count + 1),
      [FeedbackValues.BAD]: () => setBad(count => count + 1)
    }[value]

    // evaluate
    setFeedbackValue()
  }
}

export default App