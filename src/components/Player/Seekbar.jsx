/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import React from 'react';

function Seekbar({
  elapsed, duration, onSeek,
}) {
  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
      const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
    return '00:00';
  }
  const handleInputChange = (event) => {
    const value = parseFloat(event.target.value);
    // setDuration(value);
    onSeek(value);
  };

  //   const handleInputCommit = () => {
  //     // Handle the seek event when user releases the seekbar thumb
  //     // Call your music player's seek method with the elapsed time
  //     oncSeek(elapsed);
  //   };
  return (
    <div className="hidden sm:flex flex-row items-center">
      <Typography sx={{ color: 'silver' }}>{formatTime(elapsed)}</Typography>
      <input
        type="range"
        step="any"
        value={elapsed}
        max={duration}
        onChange={handleInputChange}
        // onInput={handleInputChange}
        // onMouseUp={handleInputCommit}
        // onTouchEnd={handleInputCommit}
        className="w-[65vw] h-1 rounded-lg"
      />
      <Typography sx={{ color: 'silver' }}>{formatTime(duration - elapsed)}</Typography>
    </div>
  );
}

export default Seekbar;
