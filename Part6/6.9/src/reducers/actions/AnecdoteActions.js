
export const AnecdoteActions = {
    VOTE: 'Vote',
    CREATE: 'Create'
}

export const vote = (id) => {
    return {
        type: AnecdoteActions.VOTE,
        payload: {
            id
        }
    }
}

export const create = (content) => {
    return {
        type: AnecdoteActions.CREATE,
        payload: {
            id: crypto.randomUUID(),
            content,
            votes: 0
        }
    }
}