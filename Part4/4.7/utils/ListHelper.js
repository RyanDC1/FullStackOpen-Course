const _ = require('lodash')

const totalLikes = (blogs) => {
    if(blogs == null)
    {
        return 0
    }
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    if(blogs == null)
    {
        return null
    }
    // return null if no blogs / no blogs containing likes
    return blogs.reduce((favourite, blog) => {
        if(blog.likes > (favourite?.likes || 0))
        {
            return {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
        return favourite
    }, null)
}

const mostBlogs = (blogs) => {
    if(_.isEmpty(blogs))
    {
        return null
    }

    const authorGroup = _.countBy(blogs, 'author')
    const maxBlogCount = Math.max(...Object.values(authorGroup))
    const authorWithMostBlogs = _.pickBy(authorGroup, (count) => count === maxBlogCount)
    return {
        author: Object.keys(authorWithMostBlogs)[0],
        blogs: Object.values(authorWithMostBlogs)[0]
    }
}

module.exports = {
    totalLikes,
    favouriteBlog,
    mostBlogs
}