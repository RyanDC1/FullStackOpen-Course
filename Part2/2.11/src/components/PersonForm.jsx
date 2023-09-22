import React, { useState } from 'react'

export default function PersonForm({ onCreate, validate }) {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    return (
        <form onSubmit={onPersonCreate}>
            <div>
                name: <input required onChange={(event) => setNewName(event.target.value)} value={newName} />
            </div>
            <div>
                number: <input required onChange={(event) => setNewNumber(event.target.value.trim())} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

    function onPersonCreate(event) {
        event.preventDefault()

        const newPerson = { name: newName.trim(), number: newNumber, id: crypto.randomUUID() }
        console.log(newPerson);
        const isValid = validate(newPerson)

        if(isValid)
        {
            onCreate(newPerson)
            setNewName('')
            setNewNumber('')
        }
      }
}
