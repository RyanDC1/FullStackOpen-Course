const { blogs } = require("../utils/Constants")
const { totalLikes, favouriteBlog, mostBlogs } = require("../utils/ListHelper")

describe('Total Likes', () => {
    test('Test Empty List', () => {
        expect(totalLikes([])).toBe(0)
    }),

    test('Test List of one item', () => {
        const blog = blogs[0]
        expect(totalLikes([blog])).toBe(blog.likes)
    }),

    test('Test List of one item containing 0 likes', () => {
        const blog = blogs[4]
        // console.log(JSON.stringify(blog))
        expect(totalLikes([blog])).toBe(blog.likes)
    }),

    test('Test List of all items', () => {
        const _totalLikes = blogs.reduce((sum, item) => sum + item.likes, 0)
        // console.log(totalLikes)
        expect(totalLikes(blogs)).toBe(_totalLikes)
    })
})

describe('Favourite Blog', () => {
    test('Test Empty List', () => {
        expect(favouriteBlog([])).toEqual(null)
    }),

    test('Test List of one item', () => {
        const blog = blogs[0]
        expect(favouriteBlog([blog])).toEqual({
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        })
    }),

    test('Test List of one item containing 0 likes', () => {
        const blog = blogs[4]
        expect(favouriteBlog([blog])).toEqual(null)
    }),

    test('Test List of all items', () => {
        const _favouriteBlog = blogs[2]
        expect(favouriteBlog(blogs)).toEqual({
            title: _favouriteBlog.title,
            author: _favouriteBlog.author,
            likes: _favouriteBlog.likes
        })
    })
})

describe('Most Blogs', () => {
    test('Test Empty List', () => {
        expect(mostBlogs([])).toEqual(null)
    }),

    test('Test List of one item', () => {
        const blog = blogs[0]
        expect(mostBlogs([blog])).toEqual({
            author: blog.author,
            blogs: 1
        })
    }),

    test('Test List of all items', () => {
        expect(mostBlogs(blogs)).toEqual({
            author: "Robert C. Martin",
            blogs: 4
        })
    })
})