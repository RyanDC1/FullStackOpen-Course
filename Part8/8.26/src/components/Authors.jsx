import { useQuery } from "@apollo/client"
import { GET_AUTHORS } from "../queries/Queries"
import Loader from "./Loader"
import { get } from 'lodash'
import EditAuthor from "./EditAuthor"
import { useState } from "react"

const Authors = (props) => {

  const { loading, data = [] } = useQuery(GET_AUTHORS, { skip: !props.show })
  const { data: authors = [], count = 0 } = get(data, 'getAuthors', {})

  const [selected, setSelected] = useState()

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <Loader loading={loading}>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a._id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
                <td>
                  <button onClick={() => {
                    setSelected({ id: a._id, name: a.name, year: a.born })
                  }}>
                    Edit
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          selected &&
          <EditAuthor
            id={selected.id}
            name={selected.name}
            year={selected.year}
            onCancel={() => {
              setSelected()
            }}
          />
        }
      </Loader>
    </div>
  )
}

export default Authors
