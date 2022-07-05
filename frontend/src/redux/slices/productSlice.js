import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/productApi'

const initialState = {
  products: null,
  productActive: null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProductActive: (state, action) => {
      state.productActive = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getData.matchFulfilled, (state, { payload }) => {
      state.products = payload.products
    })
  },
})

export const selectProduct = (state) => state.persist.products.products
export const productActions = { ...productSlice.actions }
export default productSlice.reducer
