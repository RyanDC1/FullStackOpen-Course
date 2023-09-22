import React from 'react'
import PersonDetails from './PersonDetails'
import ContactService from '../services/ContactService'

export default function PersonsList({ persons = [], searchTerm, onDelete: onDeleteCallback }) {

  return (
    <>
      {
        persons?.length > 0 ?
        persons.filter(person => person.name.trim().toLowerCase().includes(searchTerm))
        .map((contact) => (
          <div key={contact.id}>
            <PersonDetails
              name={contact.name}
              number={contact.number}
            />
            <button onClick={() => onDelete(contact)}>Delete</button>
          </div>
        ))
        :
        <p>No Contacts Present</p>
      }
    </>
  )

  async function onDelete(contact) {
    const allowDelete = window.confirm(`Delete ${contact.name}?`)
    if(allowDelete)
    {
      ContactService.delete(contact.id)
      .then(() => {
        onDeleteCallback()
      })
      .catch((error) => {
        console.error("An error occurred while deleting the contact", error)
      })
    }
  }
}
