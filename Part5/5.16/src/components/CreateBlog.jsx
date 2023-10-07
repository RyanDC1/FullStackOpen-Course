import React, { useState } from 'react'
import Notifications, { StatusTypes } from './Notifications'
import { isEmpty } from 'lodash'
import BlogService from '../services/BlogService'

const formfields = {
    title: 'title',
    url: 'url'
}

export default function CreateBlog({ onCreate, showNotification }) {

    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)

    return (
        <div>
            {
                !showForm ?
                    <button onClick={() => setShowForm(true)}>Create New Blog</button>
                    :
                    <>
                        <h2>Create Blog</h2>
                        <form onSubmit={create}>
                            <div>
                                Title: <input name={formfields.title} required disabled={loading} placeholder='Title'/>
                            </div>
                            <div>
                                URL: <input name={formfields.url} required disabled={loading} placeholder='URL'/>
                            </div>
                            {
                                loading ?
                                    <p>...Creating, please wait</p>
                                    :
                                    <input type='submit' value="Create" />
                            }
                            <button onClick={() => setShowForm(false)}>Cancel</button>
                        </form>
                    </>
            }
        </div>
    )

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
                setShowForm(false)
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
