/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  name: null,
  token: null,
  id: null,
  ImgURL: null,
  email: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.ImgURL = action.payload.ImgURL;
      state.email = action.payload.email;
    },
    setLogout: (state) => {
      state.user = null;
      state.name = null;
      state.token = null;
      state.token = null;
      state.ImgURL = null;
      state.email = null;
    },
    setUserImg: (state, action) => {
      state.ImgURL = action.payload;
    },
    setUpdateProfile: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
