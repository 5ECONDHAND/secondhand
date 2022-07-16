import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/productApi'

const initialState = {
  products: null,
  productActive: null,
  productPreview: null,
  productNotifications: [],
  productSearch: null,
  productWishlist: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    clearProducts: (state) => {
      state.products = initialState.products
    },
    setProductActive: (state, action) => {
      state.productActive = { ...state.productActive, ...action.payload }
    },
    setProductPreview: (state, action) => {
      state.productPreview = action.payload
    },
    clearProductPreview: (state) => {
      state.productPreview = initialState.productPreview
    },
    setProductNotifications: (state, action) => {
      state.productNotifications = action.payload
    },
    setProductSearch: (state, action) => {
      state.productSearch = action.payload
    },
    clearCredentials: () => initialState,
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
export const selectProductPreview = (state) => state.persist.products.productPreview
export const selectProductNotifications = (state) => state.persist.products.productNotifications
export const selectProductSearch = (state) => state.persist.products.productSearch
export const selectProductActive = (state) => state.persist.products.productActive
export const selectProductWishlist = (state) => state.persist.products.productWishlist
export const productActions = { ...productSlice.actions }
export default productSlice.reducer
