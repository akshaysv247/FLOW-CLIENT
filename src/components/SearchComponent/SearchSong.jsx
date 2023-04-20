/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useDispatch } from 'react-redux';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { songActions } from '../../Redux/Slice/SongSlice';

function SearchSong({ item }) {
  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();

  const playsong = () => {
    // setSong(item);
    setPlaying(true);
    dispatch(
      songActions.setSongDetails({
        song: item,
      }),
      songActions.setPlaylist({
        played: item,
      }),
    );
  };
  return (
    <div className="w-full h-16 bg-[#10043d] flex items-center gap-2 justify-between">
      <div className="flex items-center">
        <img src={item.imgURL} alt="img" className="h-16 w-16" />
        <div>
          <p className="text-lg font-bold">{item.name}</p>
          <p className="text-xs font-thin">{item.artist}</p>
        </div>
      </div>
      <div>
        {playing ? <PauseCircleIcon sx={{ color: '#7d1aa1', fontSize: '40px' }} onClick={() => setPlaying(!playing)} /> : <PlayCircleFilledWhiteIcon sx={{ color: '#7d1aa1', fontSize: '40px' }} onClick={playsong} />}
      </div>
    </div>
  );
}

export default SearchSong;
