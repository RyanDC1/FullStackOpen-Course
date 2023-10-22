import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notifications, { StatusTypes } from './components/Notifications'
import './css/index.css'
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/client"
import { AUTHORIZE, GET_BOOKS } from './queries/Queries'
import LoginForm from './components/LoginForm'
import { get } from 'lodash'
import RecomendedReads from './components/RecomendedReads'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState({ message: undefined, status: undefined })

  const { data: loggedInUser = { me: null }, refetch } = useQuery(AUTHORIZE)

  const client = useApolloClient()

  const { favouriteGenre = [] } = loggedInUser.me || {}

  useEffect(() => {
    if (notification.message) {
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
        <button onClick={() => setPage('recomended')}>Recomended</button>
        {
          loggedInUser.me ?
            <button onClick={() => {
              localStorage.removeItem('token')
              client.resetStore()
            }}
            >
              logout
            </button>
            :
            <button onClick={() => setPage('login')}>Login</button>
        }
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

      {
        page === 'recomended' &&
        <RecomendedReads
          favourites={favouriteGenre}
        />
      }

      {
        page === 'login' &&
        <LoginForm onLogin={() => refetch()}/>
      }
    </div>
  )
}

export default App
