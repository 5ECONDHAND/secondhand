import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authMiddleware } from './middleware/authMiddleware'
import { authApi } from './services/authApi'
import { productApi } from './services/productApi'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productSlice'
import { editApi } from './services/editApi'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    products: productsReducer,
    [productApi.reducerPath]: productApi.reducer,
    [editApi.reducerPath]: editApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productApi.middleware).concat(editApi.middleware).concat(authMiddleware),
})

setupListeners(store.dispatch)
