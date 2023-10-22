import { useEffect } from 'react'
import { useLazyQuery } from "@apollo/client"
import { get } from 'lodash'
import { GET_BOOKS } from '../queries/Queries'

export default function RecomendedReads({ favourites = [] }) {
    const [getRecomendedBooks, { data = [] }] = useLazyQuery(GET_BOOKS)
    const { data: recomendedBooks = [], count = 0 } = get(data, 'getBooks', {})


    useEffect(() => {
        if (favourites.length > 0) {
            getRecomendedBooks({
                variables: {
                    genres: favourites
                }
            })
        }
    }, [favourites])

    return (
        <>
            <p>Favourites: {favourites.join(', ')}</p>
            <p>Recomended Reads: {recomendedBooks.map(s => s.title).join(', ')}</p>
        </>
    )
}
