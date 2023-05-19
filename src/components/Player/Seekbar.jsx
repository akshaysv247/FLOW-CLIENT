/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import React from 'react';

function Seekbar({
  elapsed, duration, audio, setElapsed,
}) {
  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
      const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
    return '00:00';
  }
  const handleChange = (e) => {
    const seektime = parseFloat(e.target.value);
    // eslint-disable-next-line no-param-reassign
    audio.current.currentTime = seektime;
    setElapsed(seektime);
  };
  return (
    <div className="hidden sm:flex flex-row items-center">
      <Typography sx={{ color: 'silver', fontSize: '15px' }}>{formatTime(elapsed)}</Typography>
      <input
        type="range"
        step="any"
        value={elapsed}
        min="0"
        max={duration}
        onChange={handleChange}
        className="w-[70vw] bg-[#22023b] h-1"
      />
      <Typography sx={{ color: 'silver', fontSize: '15px' }}>{formatTime(duration - elapsed)}</Typography>
    </div>
  );
}

export default Seekbar;
