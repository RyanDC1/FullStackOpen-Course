import { useSelector, useDispatch } from 'react-redux'
import { updateById } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { AnecdoteService } from '../services/AnecdoteService'

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
            <div key={anecdote.id} style={{ marginBottom: 8 }}>
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
        AnecdoteService.update(anecdote.id, {
            ...anecdote,
            votes: anecdote.votes + 1
        })
        .then((response) => {
            dispatch(updateById(response))
            dispatch(setNotification({
                message: `you voted ${anecdote.content}`
            }))
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export default AnecdoteList