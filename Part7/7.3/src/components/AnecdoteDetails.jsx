import React from 'react'

export default function AnecdoteDetails({ anecdote }) {
  return (
    <div>
        <h2>Anecdote Details</h2>
        <h4>{anecdote.content}</h4>
        <p>has {anecdote.votes} votes</p>
        For more Info: <a href={anecdote.info} target='_blank'>{anecdote.info}</a>
    </div>
  )
}
