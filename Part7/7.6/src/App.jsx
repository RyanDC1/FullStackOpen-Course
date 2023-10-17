import { useState } from 'react'
import { About, AnecdoteDetails, AnecdoteList, CreateAnecdote, Footer, Layout, Menu, Notifications } from './components'
import { BrowserRouter as Router, Routes, Route, useMatch, Navigate, useNavigate } from 'react-router-dom'
import { appRoutes } from './utils/Constants'
import './css/index.css'
import { StatusTypes } from './components/Notifications'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notifications, setNotifications] = useState({ message: undefined })

  const match = useMatch(appRoutes.anecdotes.details)
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate(appRoutes.anecdotes.list)

    setNotifications({ message: `Anecdote ${anecdote.content} created successfully!`, status: StatusTypes.SUCCESS })
    setTimeout(() => {
      setNotifications({ message: undefined })
    }, 5000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const anecdote = match ? anecdoteById(~~match.params.id) : null

  return (
    <Layout
      header={<Menu />}
      footer={<Footer />}
    >
      <Notifications {...notifications} />
      <Routes>
        <Route path={appRoutes.root} element={<Navigate replace to={appRoutes.anecdotes.list} />} />
        <Route path={appRoutes.anecdotes.list} element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path={appRoutes.anecdotes.create} element={<CreateAnecdote onAddNew={addNew} />} />
        <Route path={appRoutes.anecdotes.about} element={<About />} />
        <Route path={appRoutes.anecdotes.details} element={<AnecdoteDetails anecdote={anecdote} />} />
      </Routes>
    </Layout>
  )
}

export default App
