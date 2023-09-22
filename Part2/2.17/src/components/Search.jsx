import React from 'react'

export default function Search({ onSearch, value }) {
  return (
    <>
        Search <input value={value} onChange={(event) => onSearch(event.target.value.toLowerCase())}/>
    </>
  )
}
