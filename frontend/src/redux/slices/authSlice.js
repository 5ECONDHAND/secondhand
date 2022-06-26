import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setCredentials: (state, action) => {
    //   localStorage.setItem(
    //     'user',
    //     JSON.stringify({
    //       user: action.payload.user,
    //       token: action.payload.token,
    //     })
    //   )
    //   state.user = action.payload.user
    //   state.token = action.payload.token
    // },
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: {},
})

export const authActions = { ...authSlice.actions }
export default authSlice.reducer
