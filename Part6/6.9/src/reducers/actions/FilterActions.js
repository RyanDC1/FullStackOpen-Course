export const FilterActions = {
    SearchTerm: 'searchTerm'
}

export const setSearchTerm = (searchTerm) => {
    return {
        type: FilterActions.SearchTerm,
        payload: searchTerm
    }
}