import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filters from './components/Filter'
import { useEffect } from 'react'
import Notifications from './components/Notifications'
import { InitializeAnecdotes } from './reducers/actions/anecdoteActions'

const App = () => {

  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications {...notifications} />
      <Filters />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App