import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/api',
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
