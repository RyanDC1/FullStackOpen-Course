import React from 'react'
import Weather from './Weather'

export default function CountryDetails({ country, allowCancel, onCancel }) {

  const [latitude, longitude] = country?.latlng

  return (
    <div>
      {
        allowCancel &&
        <button onClick={onCancel}>Close</button>
      }
      <h1>{country?.name?.common || country?.name?.official}</h1>

      <p>Capital: {country?.capital?.[0]}</p>
      <p>Area Code: {country?.area}</p>

      <h2>Languages:</h2>

      {
        <ul>
          {
            Object.values(country?.languages ?? {}).map((lang) => (
              <li key={lang}>{lang}</li>
            ))
          }
        </ul>
      }

      <div>
        <img src={country?.flags?.png || country?.flags?.svg} alt={country?.flags?.alt} />
      </div>

      <div>
        <h2>Weather</h2>
        <Weather
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    </div>
  )
}
