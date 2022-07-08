import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/productApi'

const initialState = {
  products: null,
  productActive: null,
  productPreview: null
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
    setProductPreview: (state, action) => {
      state.productPreview = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getData.matchFulfilled, (state, { payload }) => {
      state.products = payload.products
    })
  },
})

export const selectProduct = (state) => state.persist.products.products
export const selectProductPreview = (state) => state.products.productPreview
export const productActions = { ...productSlice.actions }
export default productSlice.reducer
