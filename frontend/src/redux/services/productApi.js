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
  }),
})

export const { useGetDataQuery, useGetDataByIdQuery } = productApi
