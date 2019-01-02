export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FAVORITES':
      return action.favorites
    case 'CLEAR_FAVORITES':
      return []
    default:
      return state
  }
}