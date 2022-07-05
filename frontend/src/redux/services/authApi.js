import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://febesh5-dev.herokuapp.com/api',
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email: email, password: password },
      }),
    }),
    registerUser: builder.mutation({
      query: ({ fullname, email, password }) => ({
        url: '/register',
        method: 'POST',
        body: { fullname: fullname, email: email, password: password },
      }),
    }),
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi
