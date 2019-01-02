import { logInUser, setError } from '../actions/index'

export const signInUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/users`
      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (!result.ok) {
        throw new Error('Email or password do not match!')
      }
      const data = await result.json()
      dispatch(logInUser(data.data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}