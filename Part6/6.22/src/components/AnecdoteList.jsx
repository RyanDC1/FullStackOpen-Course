import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { AnecdoteService } from '../services/AnecdoteService'
import Loader from './Loader'

export default function AnecdoteList() {

    const queryClient = useQueryClient()
    const updateAnecdote = useMutation({ 
        mutationFn: (anecdote) => AnecdoteService.update(anecdote.id, anecdote),
    })

    const { data = [], error, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => AnecdoteService.get(),
        retry: 1,
        refetchOnWindowFocus: false
    })

    const handleVote = (anecdote) => {
        const postData = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        updateAnecdote.mutateAsync({...postData})
        .then((response) => {
            console.log(response)
            refetch()
        })
    }

    return (
        <Loader loading={isLoading}>
            {
                error ?
                    <p>An error occurred while fetching the list</p>
                    :
                    data.map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => handleVote(anecdote)}>vote</button>
                            </div>
                        </div>
                    )
            }
        </Loader>
    )
}