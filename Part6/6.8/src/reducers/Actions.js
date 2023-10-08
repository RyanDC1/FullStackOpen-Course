
export const Actions = {
    VOTE: 'Vote',
    CREATE: 'Create'
}

export const vote = (id) => {
    return {
        type: Actions.VOTE,
        payload: {
            id
        }
    }
}

export const create = (content) => {
    return {
        type: Actions.CREATE,
        payload: {
            id: crypto.randomUUID(),
            content,
            votes: 0
        }
    }
}