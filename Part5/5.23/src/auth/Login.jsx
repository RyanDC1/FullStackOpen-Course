import React, { useState } from 'react'
import AuthService from '../services/AuthService'
import Notifications, { StatusTypes } from '../components/Notifications'
import { isEmpty } from 'lodash'
import { getUserSession, updateUserSession } from './session'
import PropTypes from 'prop-types'

const formfields = {
  username: 'username',
  password: 'password'
}

export default function Login({ onLogin }) {

  const [notification, setNotification] = useState({
    message: null,
    status: null
  })
  const [loading, setLoading] = useState(false)

  return (
    <div>
        <Notifications {...notification}/>
        <h2>Login</h2>
        <form onSubmit={signin} id='login-form'>
            <div>
                Username: <input id="username" name={formfields.username} required disabled={loading}/>
            </div>
            <div>
                Password: <input id="password" name={formfields.password} type='password' required disabled={loading}/>
            </div>
            {
              loading ?
              <p>...signing in, please wait</p>
              :
              <button id="login-btn" type='submit'>Signin</button>
            }
        </form>
    </div>
  )
  
  function showNotification(message, status, timeout = 5000) {
    setNotification({
      message,
      status
    })

    setTimeout(() => {
      setNotification({
        message: null
      })
    }, timeout);
  }

  function signin(event) {
    event.preventDefault()
    // destructure form values
    const { 
      [formfields.username]: username, 
      [formfields.password]: password 
    } = event.target

    if(isEmpty(username) || isEmpty(password))
    {
      showNotification(`Invalid username or password`, StatusTypes.ERROR)
      return
    }

    console.log("Attempting Login:", username.value)

    setLoading(true)
    AuthService.login({ username: username.value.trim(), password: password.value })
    .then((response) => {
      console.log("Login Success: ", response)
      updateUserSession(response.token)
      onLogin(getUserSession())
    })
    .catch((error) => {
      console.log("Login Failed: ", error)
      showNotification(error?.response?.data?.error, StatusTypes.ERROR)
    })
    .finally(() => {
      setLoading(false)
    })
  }
}


Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}