import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const editApi = createApi({
  reducerPath: 'editApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/api',
  }),
  endpoints: (builder) => ({
    editUser: builder.mutation({
      query: ({ id, fullname, city, address, phoneNo, token }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: { fullname: fullname, city: city, address: address, phoneNo: phoneNo },
      }),
    }),
  }),
})


export const { useEditUserMutation } = editApi