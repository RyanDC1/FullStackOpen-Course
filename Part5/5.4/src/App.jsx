import React from 'react'
import './css/index.css'
import AuthSession from './components/AuthSession'
import BlogList from './components/BlogList'

const App = () => {
  return (
    <>
      <AuthSession>
        <BlogList />
      </AuthSession>
    </>
  )
}

export default App