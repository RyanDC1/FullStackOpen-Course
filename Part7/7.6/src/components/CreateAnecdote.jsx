import React, { useState } from 'react'
import { useField } from '../utils/hooks'

export default function CreateAnecdote({ onAddNew }) {

    const { reset: resetContent, ...content } = useField('text')
    const { reset: resetAuthor, ...author } = useField('text')
    const { reset: resetInfo, ...info } = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={onReset}>
                <div>
                    content
                    <input name='content' {...content} />
                </div>
                <div>
                    author
                    <input name='author' {...author} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...info} />
                </div>
                <button type='submit'>create</button>
                <button type='reset'>reset</button>
            </form>
        </div>
    )

    function onReset() {
        resetContent()
        resetAuthor()
        resetInfo()
    }
}
