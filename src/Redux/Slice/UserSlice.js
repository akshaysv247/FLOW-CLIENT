/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  name: null,
  token: null,
  id: null,
  ImgURL: null,
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
    },
    setLogout: (state) => {
      state.user = null;
      state.name = null;
      state.token = null;
      state.token = null;
      state.ImgURL = null;
    },
    setUserImg: (state, action) => {
      state.ImgURL = action.payload;
    },
  },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
