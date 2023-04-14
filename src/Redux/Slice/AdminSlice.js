/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  name: null,
  id: null,
  adminToken: null,
  imgURL: null,
};

export const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.adminToken = action.payload.adminToken;
      state.imgURL = action.payload.imgURL;
    },
    setAdminLogout: (state) => {
      state.admin = null;
      state.name = null;
      state.id = null;
      state.adminToken = null;
    },
  },
});

export const adminActions = AdminSlice.actions;
export default AdminSlice.reducer;
