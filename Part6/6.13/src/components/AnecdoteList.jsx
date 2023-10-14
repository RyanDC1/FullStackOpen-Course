import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { reset, setNotification } from '../reducers/notificationReducer'
import Notifications from './Notifications'
import { useEffect } from 'react'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>
        !state.filters.searchTerm ?
            state.anecdotes
            :
            state.anecdotes.filter(s => s.content.trim().toLowerCase().includes(state.filters.searchTerm.trim().toLowerCase()))
    )

    return (

        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => onVote(anecdote)}>vote</button>
                </div>
            </div>
        )
    )

    function onVote(anecdote) {
        dispatch(vote(anecdote.id))
        dispatch(setNotification({
            message: `you voted ${anecdote.content}`
        }))
    }
}

export default AnecdoteList