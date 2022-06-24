import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://testtourapp.herokuapp.com',
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/signin',
        method: 'POST',
        body: { email: email, password: password },
      }),
    }),
  }),
})

export const { useLoginUserMutation } = authApi
