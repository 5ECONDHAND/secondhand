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
      query: ({ id, editData, token }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: { Photos: editData.get('Photos'), fullname: editData.get('fullname'), city: editData.get('city'), address: editData.get('address'), phoneNo: editData.get('phoneNo') },
      }),
    }),
  }),
})

export const { useGetUserByIdQuery, useEditProfileMutation } = userApi
