import axios from 'axios'
import { apiRoutes } from '../utils/constants'

export const AnecdoteService = {
    get: async () => {
        const response = await axios.get(apiRoutes.anecdotes.root)
        return response.data
    },

    create: async (anecdote) => {
        const response = await axios.post(apiRoutes.anecdotes.root, anecdote)
        return response.data
    },

    update: async (anecdoteId, anecdote) => {
        const response = await axios.put(`${apiRoutes.anecdotes.root}/${anecdoteId}`, anecdote)
        return response.data
    }
}