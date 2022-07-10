import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/productApi'

const initialState = {
  products: null,
  productActive: null,
  productPreview: null,
  productNotifications: [],
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
    },
    setProductNotifications: (state, action) => {
      console.log(action)
      state.productNotifications = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getData.matchFulfilled, (state, { payload }) => {
      state.products = payload.products
    })
  },
})

export const selectProduct = (state) => state.persist.products.products
export const selectProductPreview = (state) => state.productPreview
export const selectProductNotifications = (state) => state.persist.products.productNotifications
export const productActions = { ...productSlice.actions }
export default productSlice.reducer
