import React, { useState, useEffect } from 'react'
import { Search, PersonForm, PersonsList, Notifications, StatusTypes } from './components'
import ContactService from './services/ContactService'
import './css/index.css'
import { statusCodes } from './utils/constants'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    status: null
  })

  useEffect(() => {
    fetchContacts()
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>

      <Notifications {...notification} />

      <Search value={searchTerm} onSearch={(searchTerm) => setSearchTerm(searchTerm)} />

      <PersonForm
        persons={persons}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onUpdateFailed={onUpdateFailed}
        onCreateFailed={onCreateFailed}
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

  function onCreate(contact) {
    fetchContacts()
    showNotification(`Added ${contact.name} to Phonebook`, StatusTypes.SUCCESS)
  }

  function onUpdate(contact) {
    fetchContacts()
    showNotification(`Contact ${contact.name} updated successfully`, StatusTypes.SUCCESS)
  }

  function onUpdateFailed(contact, error) {
    const errorStatus = error?.response?.status
    if(errorStatus === statusCodes.NOT_FOUND)
    {
      showNotification(`Contact ${contact.name} could not be found`, StatusTypes.ERROR)
    }
    else {
      showNotification(`Failed to update contact ${contact.name}`, StatusTypes.ERROR)
    }
      
  }

  function onCreateFailed(contact, error) {
    showNotification(error?.response?.data?.message ?? 'Error occurred while creating', StatusTypes.ERROR)
  }

  function showNotification(message, status, timeout = 5000) {
    setNotification({
      message,
      status
    })

    setTimeout(() => {
      setNotification({
        message: null
      })
    }, timeout)
  }

  function fetchContacts() {
    setIsLoading(true)
    ContactService.getAll()
      .then(persons => {
        setPersons(persons ?? [])
      })
      .catch((error) => console.error('An error occurred while fetching person contacts', error))
      .finally(() => setIsLoading(false))
  }
}

export default App