const COUNTRY_BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/'
const WEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=${process.env.REACT_APP_OPEN_WHETHER_API_KEY}`
export const WHETHER_ICON_URL = 'https://openweathermap.org/img/wn/{iconId}@2x.png'

export const apiRoutes = {
    countries: {
        list:  `${COUNTRY_BASE_URL}/api/all`,
        search: `${COUNTRY_BASE_URL}/api/name/{searchTerm}`
    },
    weather: {
        root: WEATHER_BASE_URL
    }
}