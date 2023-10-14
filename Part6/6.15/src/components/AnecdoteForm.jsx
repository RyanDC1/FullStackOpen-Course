import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { AnecdoteService } from '../services/AnecdoteService'

const formFields = {
    Anecdote: 'anecdote'
}

export default function AnecdoteForm() {

    const dispatch = useDispatch()

    return (
        <div>
            <h2>Create Anecdote</h2>
            <form onSubmit={createAnecdote}>
                <div>
                    <input name={formFields.Anecdote} />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )

    function createAnecdote(event) {
        event.preventDefault()
        const { [formFields.Anecdote]: anecdote } = event.target

        AnecdoteService.create({
            content: anecdote.value,
            id: crypto.randomUUID(),
            votes: 0
        })
        .then((response) => {
            dispatch(add(response))
            dispatch(setNotification({
                message: `you created ${response.content}`
            }))
            anecdote.value = ''
        })
        .catch((error) => {
            console.error(error)
        })
    }
}
