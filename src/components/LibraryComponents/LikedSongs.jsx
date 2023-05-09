/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLikedSongs } from '../../Api/userApis';

function LikedSongs() {
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const response = await getLikedSongs(id);
      if (response.success) {
        setSongs(response.songs);
      }
    };
    invoke();
  }, []);
  return (
    <div className="h-60 w-[27rem] bg-[#1a0427] rounded-xl">
      <div
        className="h-40  bg-gradient-to-r from-[#b700ff] rounded-tr-xl rounded-tl-xl p-3 flex items-center justify-center relative"
        onClick={() => navigate('/liked-songs')}
      >
        <FavoriteIcon sx={{ fontSize: '100px', color: 'violet' }} />
      </div>
      <h1 className="text-3xl font-semibold absolute">Liked Songs</h1>
      <div className="flex justify-between w-full h-20 items-center px-3">
        <h1>
          {songs.length}
          {' '}
          songs
        </h1>
        {/* <PlayCircleFilledIcon sx={{ color: '#b700ff', fontSize: '40px' }} /> */}
      </div>
    </div>
  );
}

export default LikedSongs;
