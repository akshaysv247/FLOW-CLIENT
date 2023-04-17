/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { songActions } from '../../Redux/Slice/SongSlice';
import { LikeSong, checkLikedSong } from '../../Api/userApis';

function SongCard({ song, setSong, setToasting }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { id } = useSelector((state) => state.user);
  const likeSong = async () => {
    const result = await LikeSong(song._id, id);
    if (result.success) {
      setLiked(true);
      setToasting(result.message);
    } else {
      setLiked(false);
      setToasting(result.message);
    }
  };
  const playsong = () => {
    setSong(song);
    dispatch(
      songActions.setSongDetails({
        song: song,
      }),
      songActions.setPlaylist({
        played: song,
      }),
    );
  };
  useEffect(() => {
    const check = async () => {
      const result = await checkLikedSong(id, song._id);
      if (result.success) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    check();
  }, [liked]);
  return (
    <div
      key={song?._id}
      className="w-52 h-64 bg-gradient-to-r from-[#29073d] to-[#0e030e] rounded hover:scale-105 flex flex-col items-center py-2 gap-2"
    >
      <img
        src={song.imgURL}
        alt="img"
        className="h-44 w-48 rounded"
        onClick={playsong}
      />
      <div className="px-2 flex justify-between w-48">
        <div className="flex flex-col">
          <h1>{ song.name }</h1>
          <p className="text-sm font-extralight">{ song.artist }</p>
        </div>
        {!liked ? <i><FavoriteBorderIcon sx={{ fontSize: '40px' }} onClick={likeSong} /></i>
          : <i><FavoriteIcon sx={{ color: 'red', fontSize: '40px' }} onClick={likeSong} /></i>}
      </div>
    </div>
  );
}

export default SongCard;
