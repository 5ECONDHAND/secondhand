import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://febesh5-dev.herokuapp.com/api',
  }),
  refetchOnMountOrArgChange: 15,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // get all products (universal)
    getData: builder.query({
      query: (count) => `/products?${count}`,
      providesTags: ['Products'],
    }),
    // get all products (seller)
    getProductsSeller: builder.query({
      query: (token) => ({
        url: '/products',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }),
      providesTags: ['Products'],
    }),
    // get product by id
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
      invalidatesTags: ['Products'],
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
      invalidatesTags: ['Products'],
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
      invalidatesTags: ['Products'],
    }),
    // get notifications
    getNotifications: builder.query({
      query: (token) => ({
        url: '/notifications',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }),
    }),
    // get notification by id
    getNotificationById: builder.query({
      query: ({ id, token }) => ({
        url: `/notifications/${id}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }),
    }),
  }),
})

export const {
  useGetDataQuery,
  useGetProductsSellerQuery,
  useGetDataByIdQuery,
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  usePutProductMutation,
  usePostProductMutation,
  useDeleteProductMutation,
} = productApi
