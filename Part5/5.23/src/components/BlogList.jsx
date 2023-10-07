import { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogService from '../services/BlogService'
import CreateBlog from './CreateBlog'
import Notifications from './Notifications'

const BlogList = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState({
        message: null,
        status: null
    })

    useEffect(() => {
        getBlogs()
    }, [])

    return (
        <>
            <Notifications {...notification} />
            <CreateBlog
                onCreate={getBlogs}
                showNotification={showNotification}
            />
            <h2>blogs</h2>
            <div id='blog-list'>
            {blogs.length > 0 ?
                blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        onUpdate={getBlogs}
                        onDelete={getBlogs}
                        showNotification={showNotification}
                        {...blog}
                    />)
                :
                <p>No Blogs Present</p>
            }
            </div>
            {loading && <p>Loading...</p>}
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

    function getBlogs() {
        setLoading(true)
        BlogService.getAll()
            .then((blogs = []) => {
                console.log(blogs)
                setBlogs(blogs.sort((prev, next) => next.likes - prev.likes))
            })
            .catch((error) => {
                console.error("An error occurred whule fetching blogs", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }
}

export default BlogList