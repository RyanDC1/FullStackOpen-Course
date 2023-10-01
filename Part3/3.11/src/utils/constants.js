export const baseUrl = import.meta.env.VITE_PHONEBOOK_API

export const apiRoutes = {
    persons: {
        root: `${baseUrl}/persons`
    }
}

export const statusCodes = {
    NOT_FOUND: 404,
    ACCESS_DENIED: 401,
    SERVER_ERROR: 500
}