import { useState } from 'react'
import { Search, PersonForm, PersonsList } from './components'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [searchTerm, setSearchTerm] = useState('')

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
      <PersonsList 
        persons={persons}
        searchTerm={searchTerm}
      />
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