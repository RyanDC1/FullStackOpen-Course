import { useState, useEffect } from 'react'
import { Search, PersonForm, PersonsList } from './components'
import ContactService from './services/ContactService'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [persons, setPersons] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchTerm} onSearch={(searchTerm) => setSearchTerm(searchTerm)}/>

      <PersonForm
        persons={persons}
        onCreate={fetchContacts}
      />

      <h2>Numbers</h2>
      {
        isLoading ?
        <p>Loading...</p>
        :
        <PersonsList 
          persons={persons}
          searchTerm={searchTerm}
          onDelete={fetchContacts}
        />
      }
    </div>
  )
  
  function fetchContacts() {
    setIsLoading(true)
    ContactService.getAll()
    .then(persons => {
      setPersons(persons ?? [])
    })
    .catch((error) => console.error("An error occurred while fetching person contacts"))
    .finally(() => setIsLoading(false))
  }
}

export default App