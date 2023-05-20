import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddTrack from '../components/ArtistComponents/AddTrack';
import Track from '../components/ArtistComponents/Track';
import ArtistHomePage from '../pages/ArtistPages/ArtistHomePage';
import ArtistLoginPage from '../pages/ArtistPages/ArtistLoginPage';
import ArtistProfilePage from '../pages/ArtistPages/ArtistProfilePage';
import ArtistSignupPage from '../pages/ArtistPages/ArtistSignupPage';
import ArtistLibraryPage from '../pages/ArtistPages/ArtistLibraryPage';

import { ArtistProtectedRoute } from '../utils/ProtectedRoute';
import ArtistPlaylist from '../pages/ArtistPages/ArtistPlaylist';
import ArtistCreateList from '../pages/ArtistPages/ArtistCreateList';
import ArtistListOverview from '../pages/ArtistPages/ArtistListOverview';
import ArtistLikedSongs from '../pages/ArtistPages/ArtistLikedSongs';

function ArtistRoutes() {
  const { artistToken } = useSelector((state) => state.artist);
  return (
    <Routes>
      <Route
        path="/login"
        element={artistToken ? <ArtistHomePage /> : <ArtistLoginPage />}
      />
      <Route
        path="/signup"
        element={artistToken ? <ArtistHomePage /> : <ArtistSignupPage />}
      />
      <Route elememt={(<ArtistProtectedRoute />)}>
        <Route
          path="/home"
          element={(
            <ArtistHomePage />
        )}
        />
        <Route
          path="/profile"
          element={(
            <ArtistProfilePage />
        )}
        />
        <Route
          path="/liked-songs"
          element={(
            <ArtistLikedSongs />
        )}
        />
        <Route
          path="/library"
          element={(
            <ArtistLibraryPage />
        )}
        />
        <Route
          path="/track"
          element={(
            <Track />
        )}
        />
        <Route
          path="/AddTrack"
          element={(
            <AddTrack />
        )}
        />
        <Route
          path="/create-playlist"
          element={(
            <ArtistPlaylist />
        )}
        />
        <Route
          path="/new-playlist"
          element={(
            <ArtistCreateList />
        )}
        />
        <Route
          path="/playlists"
          element={(
            <ArtistListOverview />
        )}
        />
      </Route>
    </Routes>
  );
}

export default ArtistRoutes;
