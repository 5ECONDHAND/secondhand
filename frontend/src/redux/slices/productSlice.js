import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/productApi'

const initialState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.getData.matchFulfilled, (state, { payload }) => {
      state.products = payload.products
    })
  },
})

export const productActions = { ...productSlice.actions }
export default productSlice.reducer
