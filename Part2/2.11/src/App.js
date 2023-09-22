import { useState, useEffect } from 'react'
import { Search, PersonForm, PersonsList } from './components'
import axios from 'axios'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [persons, setPersons] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:3001/persons')
    .then(persons => {
      setPersons(persons.data ?? [])
    })
    .catch((error) => console.error("An error occurred while fetching person contacts"))
    .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchTerm} onSearch={(searchTerm) => setSearchTerm(searchTerm)}/>
      <h2>Add New</h2>
      <PersonForm
        validate={onValidateForm}
        onCreate={(newPerson) => setPersons(persons.concat(newPerson))}
      />
      <h2>Numbers</h2>
      {
        isLoading ?
        <p>Loading...</p>
        :
        <PersonsList 
          persons={persons}
          searchTerm={searchTerm}
        />
      }
    </div>
  )


  function onValidateForm(newPerson) {
    if(persons.some(person => person.name === newPerson.name))
    {
      window.alert(`${newPerson.name} is already added to phonebook`)
      return false
    }
    return true
  }
}

export default App