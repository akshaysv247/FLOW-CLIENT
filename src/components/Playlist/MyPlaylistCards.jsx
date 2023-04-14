/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useNavigate } from 'react-router-dom';

function MyPlaylistCards({ list }) {
  const navigate = useNavigate();
  const listId = list._id;
  const handleClick = () => {
    navigate('/playlists', { state: { playlistId: listId } });
  };
  return (
    <div
      className="w-52 h-60 bg-gradient-to-r from-[#2f0249] to-black rounded flex flex-col items-center py-2 gap-2"
      onClick={handleClick}
    >
      <div className="w-48 h-44 bg-[violet] rounded flex justify-center items-center">
        {list?.imgURL ? <img src={list?.imgURL} alt="img" className="bg-cover bg-center h-full" /> : <MusicNoteIcon sx={{ fontSize: '100px' }} />}
      </div>
      <div>
        <h1 className="text-xl font-semibold">{list.name}</h1>
      </div>
    </div>
  );
}

export default MyPlaylistCards;
