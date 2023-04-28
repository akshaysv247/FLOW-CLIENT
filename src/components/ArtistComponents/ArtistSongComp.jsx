/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { deleteSong, hideSong } from '../../Api/artistApi';
import { songActions } from '../../Redux/Slice/SongSlice';

function ArtistSongComp({ track, setMessage }) {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const handlePlay = () => {
    dispatch(
      songActions.setSongDetails({
        song: track,
      }),
    );
  };
  const handleHide = async () => {
    const result = await hideSong(track._id);
    if (result.sucess) {
      console.log(result);
      setMessage(result.message);
      setHidden(true);
    } else {
      setHidden(false);
      setMessage(result.message);
    }
  };
  const handleDelete = async () => {
    const result = await deleteSong(track._id);
    if (result.success) {
      console.log(result);
      setMessage(result.message);
    }
  };
  return (
    <div key={track._id} className="w-full h-16 border rounded-md flex justify-between px-2">
      <div className="flex items-center gap-2">
        <img src={track.imgURL} alt="img" className="h-16 " />
        <div>
          <p className="text-lg font-bold">{track.name}</p>
          <p className="text-sm font-thin">{track.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button sx={{ color: 'green', backgroundColor: 'pink' }} onClick={handlePlay}>Play</Button>
        {!hidden ? <Button sx={{ color: 'white', backgroundColor: 'violet' }} onClick={handleHide}>Hide</Button>
          : <Button sx={{ color: 'white', backgroundColor: 'blue' }} onClick={handleHide}>Un Hide</Button>}
        <Button sx={{ color: 'white', backgroundColor: 'red' }} onClick={handleDelete}>Delelte</Button>
      </div>
    </div>
  );
}

export default ArtistSongComp;
