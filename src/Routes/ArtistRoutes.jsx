import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddTrack from '../components/ArtistComponents/AddTrack';
import CreatePlaylist from '../components/ArtistComponents/CreatePlaylist';
import Track from '../components/ArtistComponents/Track';
import ArtistHomePage from '../pages/ArtistPages/ArtistHomePage';
import ArtistLoginPage from '../pages/ArtistPages/ArtistLoginPage';
import ArtistProfilePage from '../pages/ArtistPages/ArtistProfilePage';
import ArtistSignupPage from '../pages/ArtistPages/ArtistSignupPage';

// import ArtistPublicRoute from './utils/ArtistPublicRoute';
// import ArtistPrivateRoute from './utils/ArtistPrivateRoute';

function ArtistRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          // <ArtistPublicRoute>
          <ArtistLoginPage />
          // </ArtistPublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          // <ArtistPublicRoute>
          <ArtistSignupPage />
          // </ArtistPublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          // <ArtistPrivateRoute>
          <ArtistHomePage />
          // </ArtistPrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          // <ArtistPrivateRoute>
          <ArtistProfilePage />
          // </ArtistPrivateRoute>
        }
      />
      {/* <Route
        path="/users"
        element={
          // <ArtistPrivateRoute>
          <ArtistHomePage />
          // </ArtistPrivateRoute>
        }
      /> */}
      {/* <Route
        path="/artistlist"
        element={
          // <ArtistPrivateRoute>
          <ArtistHomePage />
          // </ArtistPrivateRoute>
        }
      /> */}
      <Route
        path="/library"
        element={
          // <ArtistPrivateRoute>
          <ArtistHomePage />
          // </ArtistPrivateRoute>
        }
      />
      <Route
        path="/track"
        element={
          // <ArtistPrivateRoute>
          <Track />
          // </ArtistPrivateRoute>
        }
      />
      <Route
        path="/AddTrack"
        element={
          // <ArtistPrivateRoute>
          <AddTrack />
          // </ArtistPrivateRoute>
        }
      />
      <Route
        path="/create-playlist"
        element={
          // <ArtistPrivateRoute>
          <CreatePlaylist />
          // </ArtistPrivateRoute>
        }
      />
      <Route
        path="/copyrights"
        element={
          // <ArtistPrivateRoute>
          <ArtistHomePage />
          // </ArtistPrivateRoute>
        }
      />
    </Routes>
  );
}

export default ArtistRoutes;
