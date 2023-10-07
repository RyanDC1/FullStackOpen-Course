import { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogService from '../services/BlogService'
import CreateBlog from './CreateBlog'

const BlogList = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        getBlogs()
    }, [])

    return (
        <>
            <CreateBlog
                onCreate={getBlogs}
            />
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )

    function getBlogs() {
        BlogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }
}

export default BlogList