/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar } from '@mui/material';
import UserRoutes from './Routes/UserRoutes';
import ArtistRoutes from './Routes/ArtistRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import Player from './components/Player/Player';

function App() {
  const { token } = useSelector((state) => state.user);
  const { artistToken } = useSelector((state) => state.artist);
  const { song } = useSelector((state) => state.song);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/artist/*" element={<ArtistRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
      {
        (token || artistToken)
        && (
        <AppBar
          position="fixed"
          color="transparent"
          sx={{ bottom: 1, top: 'auto', height: 100 }}
        >
          <Player song={song} />
        </AppBar>
        )
      }
    </>
  );
}

export default App;
