import axios from 'axios'
import { apiRoutes } from '../utils/Constants'

const weatherService = {
    get: async (latitude, longitude) => {
        const response = await axios.get(apiRoutes.weather.root.replace("{lat}", latitude).replace("{lon}", longitude))
        return response?.data
    }
}

export default weatherService