import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useCountry(name) {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if(name)
        {
            axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then((response) => {
                console.log(response)
                setCountry(response)
            })
            .catch((error) => {
                console.error(error)
            })
        }
        else {
            setCountry(null)
        }
    }, [name])


    return country
}