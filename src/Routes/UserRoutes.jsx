import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ResetPassword from '../components/HelperComponents/ResetPassword';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PlaylistOverviewPage from '../pages/PlaylistOverviewPage';
import ProfilePage from '../pages/ProfilePage';
import SignOpsPage from '../pages/SignOpsPage';
import SignupPage from '../pages/SignupPage';
import CreatePlaylistPage from '../pages/CreatePlaylistPage';
import LibraryPage1 from '../pages/LibraryPage1';
// import Feeds from '../pages/Feeds';
import LikedSongs from '../pages/LikedSongs';
import MyPlaylists from '../pages/MyPlaylists';
import ArtistOverviewPage from '../pages/ArtistOverviewPage';

import { UserProtectedRoute } from '../utils/ProtectedRoute';

function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={(<LoginPage />)}
      />
      <Route
        path="/ForgetPassword"
        element={(<ResetPassword />)}
      />
      <Route
        path="/signOps"
        element={(<SignOpsPage />)}
      />
      <Route
        path="/signup"
        element={(<SignupPage />)}
      />
      <Route element={(<UserProtectedRoute />)}>
        <Route
          path="/home"
          element={(<HomePage />)}
        />
        <Route
          path="/profile"
          element={(<ProfilePage />)}
        />
        <Route
          path="/create-playlist"
          element={(<MyPlaylists />)}
        />
        <Route
          path="/new-playlist"
          element={(<CreatePlaylistPage />)}
        />
        <Route
          path="/playlists"
          element={(<PlaylistOverviewPage />)}
        />
        <Route
          path="/view-artist"
          element={(<ArtistOverviewPage />)}
        />
        <Route
          path="/liked-songs"
          element={(<LikedSongs />)}
        />
        <Route
          path="/library"
          element={(<LibraryPage1 />)}
        />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
