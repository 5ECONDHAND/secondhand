import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: {},
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    checkAmount: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { checkAmount } = errorSlice.actions

export default errorSlice.reducer
