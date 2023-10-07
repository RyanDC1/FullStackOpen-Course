export const baseUrl = import.meta.env.VITE_BLOG_API

export const apiRoutes = {
    auth: {
        login: `${baseUrl}/auth/login`
    },
    blogs: {
        list: `${baseUrl}/blogs`,
        create: `${baseUrl}/blogs`,
        update: `${baseUrl}/blogs/{id}`,
        delete: `${baseUrl}/blogs/{id}`,
    }
}

export const statusCodes = {
    NOT_FOUND: 404,
    ACCESS_DENIED: 401,
    SERVER_ERROR: 500
}