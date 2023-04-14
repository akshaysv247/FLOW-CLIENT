/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  song: null,
  played: [null],
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
      state.played.push(action.payload.song);
    },
  },
});

export const songActions = songSlice.actions;
export default songSlice.reducer;
