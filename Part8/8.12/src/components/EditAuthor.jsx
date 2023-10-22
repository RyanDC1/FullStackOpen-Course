import { useMutation } from '@apollo/client'
import React from 'react'
import { EDIT_AUTHOR } from '../queries/Queries'

export default function EditAuthor({ id, name, year, onSave, onCancel }) {

    const [editAuthor] = useMutation(EDIT_AUTHOR)

    return (
        <>
            <div>EditAuthor</div>
            <div>
                <form onSubmit={submit}>
                    <div>
                        Name
                        <input
                            name='name'
                            defaultValue={name}
                        />
                    </div>
                    <div>
                        Birth Year
                        <input
                            name='year'
                            type="number"
                            defaultValue={year}
                        />
                    </div>
                    <button type="submit">Edit</button>
                    <button onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </>
    )

    function submit(event) {
        event.preventDefault()
        const { name, year } = event.target
        console.log(id,name,year)
        editAuthor({
            variables: {
                id,
                name: name.value,
                born: ~~year.value
            }
        })
    }
}
