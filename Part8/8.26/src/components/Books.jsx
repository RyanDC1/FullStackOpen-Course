import { useState, useEffect } from 'react'
import { useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { BOOK_ADDED, GET_BOOKS, GET_GENRES } from "../queries/Queries"
import Loader from "./Loader"
import { get, isEmpty, uniq } from "lodash"

const Books = (props) => {

  const { loading, data = [], refetch } = useQuery(GET_BOOKS, { skip: !props.show })
  const { data: books = [], count = 0 } = get(data, 'getBooks', {})

  const { data: genreData = [], refetch: refetchGenres } = useQuery(GET_GENRES, { skip: !props.show })
  const allGenres = get(genreData, 'getGenres', [])

  const client = useApolloClient()

  const [selectedGenres, setSelectedGeners] = useState([])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("SUBSCRIPTION", data)
      refetchGenres()
      props.onUpdate(data.data.bookAdded.title)
      client.cache.updateQuery({ query: GET_BOOKS }, ({ getBooks }) => {
        return {
          getBooks: {
            data: getBooks.data.concat(data.data.bookAdded),
            count: getBooks.count + 1
          }
        }
      })
    }
  })
  
  useEffect(() => {
    if(books.length > 0)
    {
      refetch({genres: selectedGenres})
    }
  }, [selectedGenres])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <Loader loading={loading}>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
              <th>genres</th>
            </tr>
            {books.map((a) => (
              <tr key={a._id}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
                <td>{a.genres?.join?.(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Filter By Genre</p>
        <button hidden={isEmpty(selectedGenres)} onClick={() => setSelectedGeners([])}>Clear</button>
        <div>
          {
            allGenres.map((genre) => (
              <button
                key={genre}
                style={selectedGenres.includes(genre) ? { background: '#77addd' } : {}}
                onClick={() => {
                  if (selectedGenres.includes(genre)) {
                    setSelectedGeners(selectedGenres.filter(s => s !== genre))
                  }
                  else {
                    setSelectedGeners((selectedGenres) => [...selectedGenres, genre])
                  }
                }}
              >
                {genre}
              </button>
            ))
          }
        </div>
      </Loader>
    </div>
  )
}

export default Books
