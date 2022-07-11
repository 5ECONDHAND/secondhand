import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userActive: null,
}

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({editData, userId}) => {
      const token = localStorage.getItem('token');
      const response = await axios({
          method: "PUT",
          data: editData,
          url:`https://febesh5-dev.herokuapp.com/api/users/${userId}`,
          headers: {
              Authorization: token,
          }
      })
      return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserActive: (state, action) => {
      state.userActive = { ...state.userActive, ...action.payload }
    },
    clearCredentials: () => initialState,
  },
  extraReducers: {
    [updateUser.fulfilled]: ( action) => {
      console.log('fulfilled')
      console.log(action.payload)
  },
  },
})

export const selectUser = (state) => state.persist.user.userActive
export const userActions = { ...userSlice.actions }
export default userSlice.reducer
