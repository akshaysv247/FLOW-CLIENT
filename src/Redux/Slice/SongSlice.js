/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  song: null,
  list: [null],
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSongDetails: (state, action) => {
      state.song = action.payload.song;
    },
    SetSongNull: (state) => {
      state.song = null;
    },
    setPlaylist: (state, action) => {
      console.log(action.payload, 'payload');
      state.list = action.payload;
    },
  },
});

export const songActions = songSlice.actions;
export default songSlice.reducer;
