import React, { useState } from 'react'
import ContactService from '../services/ContactService'

export default function PersonDetails({ name, number}) {

  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div>
      <span>{name} {number}</span>
      <button disabled={isDeleting} onClick={() => onDelete(contact)}>{isDeleting ? 'Deleting' : 'Delete'}</button>
    </div>
  )

  async function onDelete(contact) {
    if(isDeleting)
    {
      return
    }

    const allowDelete = window.confirm(`Delete ${contact.name}?`)
    if(allowDelete)
    {
      setIsDeleting(true)
      ContactService.delete(contact.id)
      .then(() => {
        onDeleteCallback()
      })
      .catch((error) => {
        console.error("An error occurred while deleting the contact", error)
      })
      .finally(() => {
        setIsDeleting(false)
      })
    }
  }
}
