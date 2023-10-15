import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notifications from './components/Notifications'
import { useNotificationsContext } from './contexts/NotificationContext'
import { useEffect } from 'react'

const App = () => {

  const [notifications, setNotification] = useNotificationsContext()

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notifications {...notifications} />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
