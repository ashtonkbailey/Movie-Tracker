import { addNewUserThunk } from './addNewUser'
import { logInUser, setError } from '../actions/index'

describe('addNewUserThunk', () => {
  let mockDispatch
  let mockUser

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockUser = {
      name: "Bailey",
      email: "ashtonkbailey@gmail.com",
      password: "123",
      loggedIn: true,
      signInError: false,
      logInError: false
    }
  })

  it('should dispatch logInUser', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => mockUser
      })
    })
    const thunk = addNewUserThunk(mockUser)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(logInUser(mockUser))
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'User already exists!'
    }))
    const thunk = addNewUserThunk(mockUser)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('User already exists!'))
  })

})
