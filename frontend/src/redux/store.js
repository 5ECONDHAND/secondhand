// redux + toolkit + query imports
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
// redux-persist imports
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
// middleware & slices imports
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import userReducer from './slices/userSlice'
import { authMiddleware } from './middleware'
import { authApi, productApi, userApi } from './services'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    // PERSIST SLICE REDUCERS
    persist: persistedReducer,
    // API REDUCERS
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(userApi.middleware)
      .concat(authMiddleware),
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)
