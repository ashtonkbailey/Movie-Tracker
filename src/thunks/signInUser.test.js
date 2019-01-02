import { signInUserThunk } from './signInUser'
import { logInUser, setError } from '../actions/index'

describe('signInUserThunk', () => {
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

  it.skip('should dispatch logInUser', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true
      })
    })
    const thunk = signInUserThunk(mockUser)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(logInUser(mockUser))
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Email or password do not match!'
    }))
    const thunk = signInUserThunk(mockUser)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('Email or password do not match!'))
  })

})
