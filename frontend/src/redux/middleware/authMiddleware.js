import { authActions } from '../slices/authSlice'

// Note: localStorage expects a string
export const authMiddleware = (store) => (next) => (action) => {
  if (authActions.setCredentials.match(action)) {
    console.log(action)
    // save credentials to localStorage
    localStorage.setItem(
      'User',
      JSON.stringify({
        id: action.payload.id,
        name: action.payload.name,
        city: action.payload.city,
        token: action.payload.token,
      })
    )
  } else if (authActions.clearCredentials.match(action)) {
    console.log(action)
    // clearing credentials on logout
    localStorage.removeItem('User')
  }
  return next(action)
}
