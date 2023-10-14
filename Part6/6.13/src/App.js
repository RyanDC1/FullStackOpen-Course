import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filters from './components/Filter'
import { useEffect } from 'react'
import { reset } from './reducers/notificationReducer'
import Notifications from './components/Notifications'

const App = () => {

  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    let timer = null
    if (notifications.message) {
      timer = setTimeout(() => {
        dispatch(reset())
      }, 5000);
    }

    return () => {
      timer && clearTimeout(timer)
    }
  }, [notifications.message])

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