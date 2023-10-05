const Blog = require("../models/Blog")

const blogs = [
    {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: '5a422a851b54a676234d17f7'
    },
    {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: '4542212312331276234d17fc'
    },
    {
        id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user: '4542212312331276234d17fc'
    }
]

const getTotal = () => {
    return blogs.length
}

const getRandomId = () => {
    const max = blogs.length - 1
    const randomIndex = Math.floor(Math.random() * max)
    const blog = blogs[randomIndex]
    return blog.id
}

const getRandomBlog = () => {
    const id = getRandomId()
    return blogs.find(s => s.id === id)
}

module.exports = {
    blogs,
    getRandomId,
    getRandomBlog,
    getTotal
}