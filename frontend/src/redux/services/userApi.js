import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'editApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://febesh5-dev.herokuapp.com/api',
  }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editProfile: builder.mutation({
      query: ({ id, fullname, city, address, phoneNo, token }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: { fullname: fullname, city: city, address: address, phoneNo: phoneNo }
      }),
    }),
  }),
})

export const { useGetUserByIdQuery, useEditProfileMutation } = userApi
