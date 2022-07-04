import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: 'null',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload
    },
    clearCredentials: () => initialState,
  },
  extraReducers: {},
})

export const selectAuth = (state) => state.persist.auth.user
export const authActions = { ...authSlice.actions }
export default authSlice.reducer
