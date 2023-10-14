import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filters from './components/Filter'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filters/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App