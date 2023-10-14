import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/actions/AnecdoteActions'

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
                    <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList