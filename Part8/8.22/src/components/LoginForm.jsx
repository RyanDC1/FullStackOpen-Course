import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/Queries'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [ login ] = useMutation(LOGIN)

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.login.value)
        onLogin()
    })
    .catch((error) => {
        console.log(error)
    })

  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm