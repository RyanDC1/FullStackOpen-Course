import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../queries/Queries"
import Loader from "./Loader"
import { get } from "lodash"

const Books = (props) => {

  const { loading, data = [] } = useQuery(GET_BOOKS, { skip: !props.show })
  const { data: books = [], count = 0 } = get(data, 'getBooks', {})

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
            </tr>
            {books.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Loader>
    </div>
  )
}

export default Books
