import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/productApi'

const initialState = {
  products: null,
}

export const productSlice = createSlice({
  name: 'product',
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
    setProduct: (state, action) => {
      state.products = { ...state, products: action.payload.product }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getData.matchFulfilled, (state, { payload }) => {
      state.products = payload.products
    })
  },
})

export const productActions = { ...productSlice.actions }
export default productSlice.reducer
