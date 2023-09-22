import React from 'react'
import PersonDetails from './PersonDetails'

export default function PersonsList({ persons, searchTerm }) {
  return (
    persons.filter(person => person.name.trim().toLowerCase().includes(searchTerm))
    .map(({ name, number, id }) => (
      <PersonDetails
        key={id}
        name={name}
        number={number}
      />
    ))
  )
}
