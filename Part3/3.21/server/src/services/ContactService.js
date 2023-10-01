import axios from 'axios'
import { apiRoutes } from '../utils/constants'

const ContactService = { 
  getAll: async () => {
    const response = await axios.get(apiRoutes.persons.root)
    return response?.data
  },
  
  create: async (newContact) => {
    const response = await axios.post(apiRoutes.persons.root, newContact)
    return response?.data
  },
  
  update: async (id, updatedContact) => {
    const response = await axios.put(`${apiRoutes.persons.root}/${id}`, updatedContact)
    return response?.data
  },

  delete: async (id) => {
    await axios.delete(`${apiRoutes.persons.root}/${id}`)
    return undefined
  },
}

export default ContactService