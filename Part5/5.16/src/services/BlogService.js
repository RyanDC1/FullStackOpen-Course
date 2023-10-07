import axios from 'axios'
import { apiRoutes } from '../../utils/constants'

const api = {
  get: (url, headers = {}) => axios.get(url, {
    headers: { Authorization: BlogService.token, ...headers }
  }),
  post: (url, body, params = {}, headers = {}) => axios.post(url, body, {
    params: params,
    headers: { Authorization: BlogService.token, ...headers }
  }),
  put: (url, body, params = {}, headers = {}) => axios.put(url, body, {
    params: params,
    headers: { Authorization: BlogService.token, ...headers }
  }),
  delete: (url, headers = {}) => axios.delete(url, {
    headers: { Authorization: BlogService.token, ...headers }
  }),
}

const BlogService = {
  token: null,

  setToken: function (newToken) {
    this.token = newToken ? `Bearer ${newToken}` : null
  },

  getAll: async function () {
    console.log(this.token)
    const response = await api.get(apiRoutes.blogs.list)
    return response.data
  },

  create: async function ({ title, url }) {
    const response = await api.post(apiRoutes.blogs.create, { title, url })
    return response.data
  },

  update: async function (blogId, blog) {
    const response = await api.put(apiRoutes.blogs.update.replace("{id}", blogId), blog)
    return response.data
  },

  delete: async function (blogId) {
    const response = await api.delete(apiRoutes.blogs.delete.replace("{id}", blogId))
    return response.data
  },
}

export default BlogService