import axios from 'axios'
import { apiRoutes } from '../../utils/constants'

const defaultHeaders = { }

const api = {
    get: (url, params = {}, headers = {}) => axios.get(url, {
        params: params,
        headers: { ...defaultHeaders, ...headers }
    }),
    post: (url, body, params = {}, headers = {}) => axios.post(url, body, {
        params: params,
        headers: { ...defaultHeaders, ...headers }
    }),
}

export default {
    login: async function ({ username, password }) {
        const response = await api.post(apiRoutes.auth.login, { username, password })
        return response.data
    }
}