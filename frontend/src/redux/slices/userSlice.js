import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userActive: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserActive: (state, action) => {
      state.userActive = action.payload
    },
    clearCredentials: () => initialState,
  },
  extraReducers: {},
})

export const selectUser = (state) => state.persist.user.userActive
export const userActions = { ...userSlice.actions }
export default userSlice.reducer
