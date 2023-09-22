import React, { useCallback } from 'react'
import { debounce } from 'lodash'

export default function Search({ onChange }) {

  const debouncedSearch = debounce(onChange, 600)

  return (
    <>
        Search <input onChange={(event) => debouncedSearch(event.target.value.toLowerCase())}/>
    </>
  )
}
