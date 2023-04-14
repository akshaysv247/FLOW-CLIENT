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

// import PublicRoute from '../utils/PublicRoute';
// import ProtectedRoute from '../utils/ProtectedRoute';

function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          // <PublicRoute>
          <LoginPage />
          // </PublicRoute>
      )}
      />
      <Route
        path="/ForgetPassword"
        element={(
          // <PublicRoute>
          <ResetPassword />
          // </PublicRoute>
        )}
      />
      <Route
        path="/signOps"
        element={(
          // <PublicRoute>
          <SignOpsPage />
          // </PublicRoute>
        )}
      />
      <Route
        path="/signup"
        element={(
          // <PublicRoute>
          <SignupPage />
          /* </PublicRoute> */
        )}
      />
      <Route
        path="/home"
        element={(
          // <ProtectedRoute>
          <HomePage />

        )}
      />
      <Route
        path="/profile"
        element={(
          // <ProtectedRoute>
          <ProfilePage />
          // </ProtectedRoute>
         )}
      />
      <Route
        path="/create-playlist"
        element={(
          // <ProtectedRoute>
          // <CreatePlaylistPage />
          <MyPlaylists />
          // </ProtectedRoute>
         )}
      />
      <Route
        path="/new-playlist"
        element={(
          // <ProtectedRoute>
          <CreatePlaylistPage />
          // </ProtectedRoute>
         )}
      />
      <Route
        path="/playlists"
        element={(
          // <ProtectedRoute>
          <PlaylistOverviewPage />
          // </ProtectedRoute>
         )}
      />
      <Route
        path="/liked-songs"
        element={(
          // <ProtectedRoute>
          <LikedSongs />
          // </ProtectedRoute>
         )}
      />
      <Route
        path="/library"
        element={(
          // <ProtectedRoute>
          <LibraryPage1 />
          // </ProtectedRoute>
         )}
      />
      {/* <Route
        path="/feeds"
        element={(
          // <ProtectedRoute>
          <Feeds />
          // </ProtectedRoute>
         )}
      /> */}
    </Routes>
  );
}

export default UserRoutes;
