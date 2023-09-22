import axios from 'axios'
import { apiRoutes } from '../utils/Constants'

const countryService = {
    getAll: async () => {
        const response = await axios.get(apiRoutes.countries.list)
        return response?.data
    },

    search: async (searchTerm) => {
        const response = await axios.get(apiRoutes.countries.search.replace("{searchTerm}", searchTerm))
        return response?.data
    }
}

export default countryService