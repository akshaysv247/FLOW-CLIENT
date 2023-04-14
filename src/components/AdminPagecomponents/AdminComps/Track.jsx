/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { deleteSong, hideSong } from '../../../Api/adminApi';

function Track({ song, setChange }) {
  const [hidden, setHidden] = useState(false);
  const handleDelete = async () => {
    const result = await deleteSong(song._id);
    if (result.success) {
      console.log(result);
      setChange(result.message);
    }
  };
  const handleHide = async () => {
    const result = await hideSong(song._id);
    if (result.success) {
      setHidden(true);
      setChange(result.message);
    } else {
      setHidden(false);
      setChange(result.message);
    }
  };
  return (
    <div key={song._id} className="w-full border flex h-16 rounded-md p-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <img src={song.imgURL} alt="img" className="h-14 w-20" />
        <div className="flex flex-col">
          <p>{song.name}</p>
          <p>{song.artist}</p>
        </div>
      </div>
      <div className="flex gap-1">
        <Button variant="contained" color="error" onClick={handleDelete}>DELETE</Button>
        {/* <Button variant="contained">EDIT</Button> */}
        {!hidden ? <Button variant="contained" color="secondary" onClick={handleHide}>Hide</Button>
          : <Button variant="contained" color="primary" onClick={handleHide}>Show</Button>}
      </div>
    </div>
  );
}

export default Track;
