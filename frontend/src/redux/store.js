import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import errorReducer from './slices/errorSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    errors: errorReducer,
  },
})
