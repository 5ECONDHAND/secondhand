import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/productApi'

const initialState = {
  products: null,
  productActive: null,
  productWishlist: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProductActive: (state, action) => {
      state.productActive = { ...state.productActive, ...action.payload }
    },
    addProductWishlist: (state, action) => {
      state.productWishlist = [...state.productWishlist, action.payload]
    },
    removeProductWishlist: (state, action) => {
      const { id } = action.payload
      state.productWishlist = state.productWishlist.filter((item) => item.wish.id !== id)
    },
    clearProductWishlist: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getData.matchFulfilled, (state, { payload }) => {
      state.products = payload.products
    })
  },
})

export const selectProduct = (state) => state.persist.products.products
export const selectProductActive = (state) => state.persist.products.productActive
export const selectProductWishlist = (state) => state.persist.products.productWishlist
export const productActions = { ...productSlice.actions }
export default productSlice.reducer
