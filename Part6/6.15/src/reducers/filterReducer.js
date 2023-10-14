import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchTerm: undefined
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            return { ...state, searchTerm: action.payload }
        }
    }
})

export default filterSlice.reducer
export const { setSearchTerm } = filterSlice.actions