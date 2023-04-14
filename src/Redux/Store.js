/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AdminSlice } from './Slice/AdminSlice';
import { UserSlice } from './Slice/UserSlice';
import { ArtistSlice } from './Slice/ArtistSlice';
import { songSlice } from './Slice/SongSlice';
import PlayerSlice from './Slice/PlayerSlice';

const persistConfigUser = { key: 'user', storage, version: 1 };
const persistConfigArtist = { key: 'artist', storage, version: 1 };
const persistConfigAdmin = { key: 'admin', storage, version: 1 };
const persistConfigSong = { key: 'song', storage, version: 1 };

const UserPersistReducer = persistReducer(persistConfigUser, UserSlice.reducer);
const ArtistPersistReducer = persistReducer(persistConfigArtist, ArtistSlice.reducer);
const AdminPersistReducer = persistReducer(persistConfigAdmin, AdminSlice.reducer);
const SongPersistReducer = persistReducer(persistConfigSong, songSlice.reducer);

export const store = configureStore({
  reducer: {
    user: UserPersistReducer,
    admin: AdminPersistReducer,
    artist: ArtistPersistReducer,
    song: SongPersistReducer,
    player: PlayerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
