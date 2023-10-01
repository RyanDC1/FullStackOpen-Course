import React from 'react'
import PersonDetails from './PersonDetails'

export default function PersonsList({ persons = [], searchTerm, onDelete }) {

  return (
    <>
      {
        persons?.length > 0 ?
          persons.filter(person => person.name.trim().toLowerCase().includes(searchTerm))
            .map((contact) => (
              <PersonDetails
                key={contact.id}
                id={contact.id}
                name={contact.name}
                number={contact.number}
                onDelete={onDelete}
              />
            ))
          :
          <p>No Contacts Present</p>
      }
    </>
  )
}
