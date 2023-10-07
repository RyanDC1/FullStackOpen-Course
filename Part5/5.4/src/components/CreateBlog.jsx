import React, { useState } from 'react'
import Notifications, { StatusTypes } from './Notifications'
import { isEmpty } from 'lodash'
import BlogService from '../services/BlogService'

const formfields = {
    title: 'title',
    url: 'url'
}

export default function CreateBlog({ onCreate }) {

    const [notification, setNotification] = useState({
        message: null,
        status: null
    })
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Notifications {...notification} />
            <h2>Create Blog</h2>
            <form onSubmit={create}>
                <div>
                    Title: <input name={formfields.title} required disabled={loading} />
                </div>
                <div>
                    URL: <input name={formfields.url} required disabled={loading} />
                </div>
                {
                    loading ?
                        <p>...Creating, please wait</p>
                        :
                        <input type='submit' />
                }
            </form>
        </>
    )

    function showNotification(message, status, timeout = 5000) {
        setNotification({
            message,
            status
        })

        setTimeout(() => {
            setNotification({
                message: null
            })
        }, timeout);
    }

    function create(event) {
        event.preventDefault()
        // destructure form values
        const {
            [formfields.title]: title,
            [formfields.url]: url
        } = event.target

        if (isEmpty(title) || isEmpty(url)) {
            showNotification(`Title and URL required`, StatusTypes.ERROR)
            return
        }

        setLoading(true)
        BlogService.create({ title: title.value.trim(), url: url.value.trim() })
            .then((response) => {
                console.log(response)
                showNotification(`A new blog '${response.title}' by ${response.author} created successfully`, StatusTypes.SUCCESS)
                onCreate && onCreate()
            })
            .catch((error) => {
                console.error("Create Failed: ", error)
                showNotification("An error occurred while creating the blog", StatusTypes.ERROR)
            })
            .finally(() => {
                setLoading(false)
            })
    }
}
