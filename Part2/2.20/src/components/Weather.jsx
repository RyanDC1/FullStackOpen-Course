import React, { useEffect, useState } from 'react'
import weatherService from '../services/WeatherService'
import Loader from './Loader'
import { WHETHER_ICON_URL } from '../utils/Constants'

export default function Weather({ latitude, longitude }) {
    const [loading, setLoading] = useState(false)
    const [weather, setWeather] = useState()
 
    useEffect(() => {
        setLoading(true)
        weatherService.get(latitude, longitude)
            .then((response) => {
                console.log("Weather", response)
                setWeather(response)
            })
            .catch((error) => {
                console.error("An error occurred while fetching error information: ", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [latitude, longitude])

    const { weather: weatherDetails = [{}] } = weather || {}
    const [{ main, description, icon }] = weatherDetails

    return (
        <Loader loading={loading}>
            <h3>{main}</h3>
            <img src={WHETHER_ICON_URL.replace('{iconId}', icon)} alt={main}/>
            <h4>{description}</h4>
            <div>
                Temperature: {weather?.main?.temp} C°
            </div>
            <div>
                Wind: {weather?.wind?.speed} m/s
            </div>
        </Loader>
    )
}
