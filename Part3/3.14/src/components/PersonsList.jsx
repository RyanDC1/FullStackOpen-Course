import React from 'react'
import PersonDetails from './PersonDetails'

export default function PersonsList({ persons = [], searchTerm, onDelete: onDeleteCallback }) {

  return (
    <>
      {
        persons?.length > 0 ?
          persons.filter(person => person.name.trim().toLowerCase().includes(searchTerm))
            .map((contact) => (
              <PersonDetails
                key={contact.id}
                name={contact.name}
                number={contact.number}
              />
            ))
          :
          <p>No Contacts Present</p>
      }
    </>
  )
}
