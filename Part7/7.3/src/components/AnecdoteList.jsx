import React from 'react'
import { Link } from 'react-router-dom'
import { appRoutes } from '../utils/Constants'

export default function AnecdoteList({ anecdotes }) {
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <li key={anecdote.id} >
                        <Link to={`${appRoutes.anecdotes.details.replace(":id", anecdote.id)}`}>{anecdote.content}</Link>
                    </li>)}
            </ul>
        </div>
    )
}
