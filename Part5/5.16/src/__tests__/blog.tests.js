import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog.jsx'
import CreateBlog from '../components/CreateBlog.jsx'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blog = {
        title: 'Test Title 123',
        author: 'Test Author',
        id: '1w1qd312d132',
        user: {
            name: "Test user",
            id: "123d1ed21e"
        },
        likes: 2,
        url: "https://www.test23r131t.com"
    }

    render(
        <Blog
            showNotification={() => { }}
            {...blog}
        />
    )

    const title = screen.getByText(blog.title)
    const author = screen.getByText(blog.author)

    expect(title).toBeDefined()
    expect(author).toBeDefined()
})

// test('clicking like button', async () => {
//     const blog = {
//         title: 'Test Title 123',
//         author: 'Test Author',
//         id: '1w1qd312d132',
//         user: {
//             name: "Test user",
//             id: "123d1ed21e"
//         },
//         likes: 2,
//         url: "https://www.test23r131t.com"
//     }

//     render(
//         <Blog
//             showNotification={() => { }}
//             {...blog}
//         />
//     )

//     const user = userEvent.setup()
//     const button = screen.getByText('view')
//     await user.click(button)

//     const url = screen.getByText(blog.url)

//     expect(url).toBeDefined()
// })

// test('clicking the button calls event handler once', async () => {
//     const blog = {
//         title: 'Test Title 123',
//         author: 'Test Author',
//         id: '1w1qd312d132',
//         user: {
//             name: "Test user",
//             id: "123d1ed21e"
//         },
//         likes: 2,
//         url: "https://www.test23r131t.com"
//     }

//     const mockHandler = jest.fn()
//     render(
//         <Blog
//             showNotification={() => { }}
//             onLikeClick={mockHandler}
//             {...blog}
//         />
//     )

//     const user = userEvent.setup()
//     const button = screen.getByText('view')
//     await user.click(button)

//     expect(mockHandler.mock.calls).toHaveLength(1)
//   })

test('Create Blog Form', () => {
    const createBlog = jest.fn()

    render(<CreateBlog onCreate={createBlog} />)

    const input = screen.getByPlaceholderText('Title')
    const sendButton = screen.getByText('create')

    userEvent.type(input, 'testing a form...')
    userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')
})