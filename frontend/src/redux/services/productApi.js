import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/api',
  }),
  endpoints: (builder) => ({
    // patch product
    putProduct: builder.mutation({
      query: ({ id, name, description, price, token }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: { name: name, description: description, price: price },
      }),
    }),
    // store product
    postProduct: builder.mutation({
      query: ({ name, description, price, token }) => ({
        url: '/products',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: { name: name, description: description, price: price },
      }),
    }),
    // get product by id
    getProductById: builder.query({
      query: (id) => ({ url: `/products/${id}` }),
    }),
    // all products
    getProductData: builder.query({
      query: () => '/products',
    }),
  }),
})

export const { usePostProductMutation } = productApi

export const { usePutProductMutation } = productApi

export const { useGetProductByIdQuery } = productApi

export const { useGetProductDataQuery } = productApi
