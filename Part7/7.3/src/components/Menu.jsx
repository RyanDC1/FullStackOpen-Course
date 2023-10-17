import React from 'react'
import { Link } from 'react-router-dom'
import { appRoutes } from '../utils/Constants'

export default function Menu() {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link to={appRoutes.anecdotes.list} style={padding}>anecdotes</Link>
            <Link to={appRoutes.anecdotes.create} style={padding}>create new</Link>
            <Link to={appRoutes.anecdotes.about} style={padding}>about</Link>
        </div>
    )
}
