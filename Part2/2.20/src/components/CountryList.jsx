import React from 'react'

export default function CountryList({ countries = [], onSelect }) {
  return (
    countries?.length > 0 ?
    countries.map(country => (
      <p key={country?.name?.common}>
        <span>
          {country?.name?.common || country?.name?.official}
        </span>
        <span>
          <button onClick={() => onSelect(country)}>View Details</button>
        </span>
      </p>
    ))
    :
    <p>No Countries Found</p>
  )
}
