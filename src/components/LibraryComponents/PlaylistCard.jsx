/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useNavigate } from 'react-router-dom';

function PlaylistCard({ playlist }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/playlists', { state: { playlistId: playlist._id } });
  };
  return (
    <div onClick={handleClick} key={playlist._id} className="h-60 w-52 bg-[#1a0427] rounded-xl px-2 pt-1">
      <div className="h-40 bg-gradient-to-r from-[#b700ff] rounded-xl flex justify-center items-center">
        {playlist.imgURL ? <img src={playlist.imgURL} alt="img" className="h-full bg-cover bg-center" /> : <MusicNoteIcon sx={{ fontSize: '150px', color: 'violet' }} />}
      </div>
      <div className="w-full h-20 flex flex-col justify-center">
        <h1 className="text-xl font-semibold">{playlist.name}</h1>
      </div>
    </div>
  );
}

export default PlaylistCard;
