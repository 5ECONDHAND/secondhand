import { authActions } from '../slices/authSlice'

export const authMiddleware = (store) => (next) => (action) => {
  if (authActions.setCredentials.match(action)) {
    console.log(action);
    // Note: localStorage expects a string
    localStorage.setItem(
      'user',
      JSON.stringify({
        user: action.payload.user,
        token: action.payload.token,
      })
    )
  } else if (authActions.clearCredentials.match(action)) {
    localStorage.removeItem('user')
  }
  return next(action)
}
