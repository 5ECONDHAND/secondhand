import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/api',
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/products',
    }),
    getDataById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    // patch product
    putProduct: builder.mutation({
      query: ({ id, name, description, price, token }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
        body: { name: name, description: description, price: price },
      }),
    }),
  }),
})

export const {
  useGetDataQuery,
  useGetDataByIdQuery,
  usePostProductMutation,
  usePutProductMutation,
} = productApi
