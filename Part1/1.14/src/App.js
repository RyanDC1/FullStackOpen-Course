import { useMemo, useState } from 'react'
import { Anecdotes } from './utils/Constants'
import { Button, Header } from './components'

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(Anecdotes.length).fill(0))

  const maxVoted = useMemo(() => {
    const maxVote = votes.reduce((prev, next) => prev < next ? next : prev)
    return Anecdotes[votes.indexOf(maxVote)]
  }, [votes])

  return (
    <div>
      <Header title="Anecdote of the day"/>
      <p>{Anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button 
        onClick={() => {
          setVotes((votes) => {
            const updatedVotes = [...votes]
            updatedVotes[selected] += 1
            return updatedVotes
          })
        }}>
        vote
      </Button>

      <Button 
        onClick={() => {
          const max = Anecdotes.length
          const randomNumber = Math.floor(Math.random() * max)
          setSelected(randomNumber)
        }}>
        next anecdote
      </Button>

      <Header title="Anecdote with most votes"/>
      {maxVoted}
    </div>
  )
}

export default App