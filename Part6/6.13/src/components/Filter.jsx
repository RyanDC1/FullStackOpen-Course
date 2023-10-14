import { useDispatch } from "react-redux"
import { setSearchTerm } from "../reducers/filterReducer"

const Filters = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setSearchTerm(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filters