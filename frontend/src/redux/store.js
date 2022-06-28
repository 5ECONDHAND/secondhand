import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authMiddleware } from './middleware/authMiddleware'
import { authApi } from './services/authApi'
import { productApi } from './services/productApi'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(authMiddleware)
      .concat(productApi.middleware),
})

setupListeners(store.dispatch)
