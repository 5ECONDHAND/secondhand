import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://febesh5-dev.herokuapp.com/api',
  }),
  refetchOnMountOrArgChange: 15,
  tagTypes: ['PutProduct', 'PostProduct', 'DeleteProduct'],
  endpoints: (builder) => ({
    // queries
    getData: builder.query({
      query: (count) => `/products?${count}`,
    }),
    // products seller
    getProductsSeller: builder.query({
      query: (token) => ({
        url: '/products',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }),
    }),
    getDataById: builder.query({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }),
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
        body: {
          name: name,
          description: description,
          price: price,
          categoryId: categoryId,
          files: files,
        },
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
        },
        body: {
          name: name,
          description: description,
          price: price,
          categoryId: categoryId,
          files: files,
        },
      }),
      providesTags: ['PostProduct'],
    }),
    // delete product
    deleteProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['DeleteProduct'],
    }),
  }),
})

export const {
  useGetDataQuery,
  useGetProductsSellerQuery,
  useGetDataByIdQuery,
  UseSearchMutation,
  usePutProductMutation,
  usePostProductMutation,
  useDeleteProductMutation,
} = productApi
