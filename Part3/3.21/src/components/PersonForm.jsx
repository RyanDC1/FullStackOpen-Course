import React, { useState } from 'react'
import ContactService from '../services/ContactService'

export default function PersonForm({ persons = [], onCreate, onUpdate, onUpdateFailed, onCreateFailed }) {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    return (
        <form onSubmit={onContactCreate}>
            <h2>Add New</h2>
            <div>
                Name: <input required onChange={(event) => setNewName(event.target.value)} value={newName} />
            </div>
            <div>
                Number: <input required onChange={(event) => setNewNumber(event.target.value.trim())} value={newNumber} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )

    function validate(contact) {
        let isValid = true
        let exitingContact = persons.find(person => person.name === contact.name)
        if(exitingContact != null)
        {
            isValid = false
            if(contact.number === exitingContact.number)
            {
                window.alert(`${contact.name} is already added to phonebook`)
            }
            else {
                // allow update only if new number is not the same as existing
                const allowUpdate = window.confirm(`${contact.name} is already added to phonebook, replace the old number with the new one?`)
                if(allowUpdate)
                {
                    updateContact({ ...contact, id: exitingContact.id })
                    return
                }
            }
        }
        
        if(isValid)
        {
            createContact(contact)
        }
      }

    function onContactCreate(event) {
        event.preventDefault()

        const newContact = { name: newName.trim(), number: newNumber, id: crypto.randomUUID() }
        const isValid = validate(newContact)

        if (isValid) {
            createContact(newContact)
        }
    }

    function createContact(contact)
    {
        ContactService.create(contact)
        .then(() => {
            onCreate(contact)  // callback to re-fetch data
            setNewName('')
            setNewNumber('')
        })
        .catch((error) => {
            console.error("An error occurred while creating the contact: ", error)
            onCreateFailed(contact, error)
        })
    }

    function updateContact(contact) {
        ContactService.update(contact.id, contact)
        .then(() => {
            onUpdate(contact)  // callback to re-fetch data
            setNewName('')
            setNewNumber('')
        })
        .catch((error) => {
            onUpdateFailed(contact, error)
            console.error("An error occurred while updating the contact: ", error)
        })
    }
}
