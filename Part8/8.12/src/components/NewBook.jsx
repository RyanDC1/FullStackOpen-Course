import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries/Queries'

const NewBook = ({ show, onError, onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
    onError: (error) => {
      console.log(error.message)
      onError(error.message)
    },
    onCompleted: (data) => {
      console.log(data)
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title,
        author,
        published: ~~published,
        genres
      }
    }).then((response) => {
      if (response.errors) {
        throw new Error(response.errors.message)
      }
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')

    })
      .catch((error) => {
        console.log(error)
      })

  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook