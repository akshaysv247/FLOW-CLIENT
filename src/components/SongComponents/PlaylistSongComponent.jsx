/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from '@mui/material';

function PlaylistSongComponent({ song, setSongId }) {
  const [track, setTrack] = useState(false);
  const AddSongToPlaylist = () => {
    setSongId(song._id);
    setTrack(true);
  };
  const removeSong = () => {
    setTrack(false);
  };
  return (
    <div key={song._id} className="w-full h-16 border flex rounded-md justify-between">
      <div className="h-full w-1/2 flex items-center gap-2">
        <img src={song.imgURL} alt="Img" className="h-14 w-14 rounde-md" />
        <div className="text-sm">
          <p className="text-lg font-extrabold">{song.name}</p>
          <p>{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center h-full gap-2 px-2">
        {track ? <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={removeSong}>Remove</Button> : <Button variant="contained" onClick={AddSongToPlaylist}>Add</Button>}
      </div>
    </div>
  );
}

export default PlaylistSongComponent;
