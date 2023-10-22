import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notifications, { StatusTypes } from './components/Notifications'
import './css/index.css'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState({ message: undefined, status: undefined })

  useEffect(() => {
    if(notification.message)
    {
      setTimeout(() => {
        setNotification({ message: undefined, status: undefined })
      }, 3000);
    }
  }, [notification])

  return (
    <div>
      <Notifications {...notification} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books show={page === 'books'} />

      <NewBook
        show={page === 'add'}
        onCreate={(message) => {
          setNotification({
            message,
            status: StatusTypes.SUCCESS
          })
        }}
        onError={(message) => {
          setNotification({
            message,
            status: StatusTypes.ERROR
          })
        }}
      />
    </div>
  )
}

export default App
