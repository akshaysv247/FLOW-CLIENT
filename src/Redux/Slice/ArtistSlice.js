/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artist: null,
  name: null,
  artistToken: null,
  id: null,
  ImgURL: null,
  email: null,
};

export const ArtistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setArtistLogin: (state, action) => {
      state.artist = action.payload.artist;
      state.name = action.payload.name;
      state.artistToken = action.payload.artistToken;
      state.id = action.payload.id;
      state.ImgURL = action.payload.ImgURL;
      state.email = action.payload.email;
    },
    setArtistLogout: (state, action) => {
      state.artist = null;
      state.name = null;
      state.artistToken = null;
      state.id = null;
      state.ImgURL = null;
      state.email = null;
    },
    setArtistImg: (state, action) => {
      state.ImgURL = action.payload;
    },
    setProfileEdit: (state, action) => {
      state.artist = action.payload.artist;
      state.name = action.payload.name;
      state.ImgURL = action.payload.ImgURL;
      state.email = action.payload.email;
    },
  },
});

export const artistAcions = ArtistSlice.actions;

export default ArtistSlice.reducer;
