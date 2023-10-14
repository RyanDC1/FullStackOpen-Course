import { useSelector, useDispatch } from 'react-redux'
import { UpdateAnecdote } from '../reducers/actions/anecdoteActions'

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
        dispatch(UpdateAnecdote(anecdote))
    }
}

export default AnecdoteList