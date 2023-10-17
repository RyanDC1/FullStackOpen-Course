import React from 'react'
import { useState } from 'react'

export default function useField(type) {

    const [value, setValue] = useState('')

    function onChange(event) {
        setValue(event.target.value)
    }

    function reset() {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}
