import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export default function useResource(baseUrl) {
    const [resources, setResources] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const create = async (resource) => {
        await axios.post(baseUrl, resource)
        getList()
    }

    const getList = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }

    const service = {
        create,
        getList
    }

    return [
        resources, service
    ]
}