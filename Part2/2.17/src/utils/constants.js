export const baseUrl = 'http://localhost:3001'

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