import { FilterActions } from "./actions/FilterActions";

const initialState = {
    searchTerm: undefined
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FilterActions.SearchTerm:
            return { ...state, searchTerm: action.payload }

        default:
            return state
    }
}