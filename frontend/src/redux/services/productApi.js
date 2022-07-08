import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://febesh5-dev.herokuapp.com/api',
  }),
  refetchOnMountOrArgChange: 15,
  tagTypes: ['PutProduct', 'PostProduct', 'DeleteProduct'],
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/products',
    }),
    getDataById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    // patch product
    putProduct: builder.mutation({
      query: ({ id, name, description, price, categoryId, files, token }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: { name: name, description: description, price: price, categoryId: categoryId, files: files },
      }),
      providesTags: ['PutProduct'],
    }),
    // store product
    postProduct: builder.mutation({
      query: ({ name, description, price, categoryId, files, token }) => ({
        url: '/products',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          "type": "formData"
        },
        body: { name: name, description: description, price: price, categoryId: categoryId, files: files },
      }),
      providesTags: ['PostProduct'],
    }),
  }),
})

export const {
  useGetDataQuery,
  useGetDataByIdQuery,
  usePostProductMutation,
  usePutProductMutation,
} = productApi
