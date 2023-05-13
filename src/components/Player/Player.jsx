/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  styled,
  Typography,
  Slider,
  Paper,
  Stack,
  Box,
} from '@mui/material';

// #-ICONS----------------------------------------------------------------
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
// ----------------------------------------------------------------
// import { getCommonSongs } from '../../Api/userApis';
// #-Styled Components----------------------------------------------------------------
const Div = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  position: 'fixed',
  justifyContent: 'center',
  paddingTop: theme.spacing(0),
  marginBottom: theme.spacing(1),
  color: 'white',

}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#270d469c',
  width: '98vw',
  height: '13vh',
  display: 'flex',
  padding: theme.spacing(),
  color: 'white',

}));
const IBox = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '15vw',
  height: '9vh',
  display: 'flex',
  marginLeft: theme.spacing(2),
  color: 'white',

}));
const DBox = styled(Box)(({ theme }) => ({
  width: '100vw',
  display: 'flex flex-col',
  marginLeft: theme.spacing(2),
  paddingTop: theme.spacing(0),
  color: 'white',
}));

const VSlider = styled(Slider)(({ theme, ...props }) => ({
  color: '#0b0618',
  height: '2',
  '&:hover': {
    cursor: 'auto',
  },
  marginLeft: theme.spacing(2),
  '& .MuiSlider-thumb': {
    width: '13px',
    height: '13px',
    display: props.thumbless ? 'none' : 'block',
  },
}));
// ----------------------------------------------------------------

function Player({ song }) {
  const List = useSelector((state) => state.song.list.list);
  const [track, setTrack] = useState('');
  const audioPlayer = useRef();
  const [index, setIndex] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rSong, setRsong] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  // const [sIndex, setSindex] = useState(null);

  useEffect(() => {
    setTrack(song);
    setIsPlaying(true);
    // let currentIndex = null;
    // if (List) {
    //   currentIndex = List.indexOf(song);
    // }
    // setIndex(currentIndex);
    if (repeat) {
      setRsong(song);
    }
    // if (shuffle) {
    //   let random = null;
    //   do {
    //     random = Math.floor(Math.random() * List.length);
    //     setSindex(random);
    //   } while (random === currentIndex && currentIndex !== null);
    // }
  }, [song]);

  useEffect(() => {
    if (index != null) {
      setTrack(List[index]);
    }
  }, [index]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }
    if (song) {
      setIsPlaying(true);
    }
  }, [
    volume,
    song,
  ]);

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
    }
  }, [isPlaying, song]);

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
      const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
    return '00:00';
  }
  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleForward = () => {
    audioPlayer.current.currentTime += 10;
  };
  const toggleBackward = () => {
    audioPlayer.current.currentTime -= 10;
  };
  const toggleSkipForward = () => {
    if (List.length - 1 > index) {
      setIndex(index + 1);
    } else if (index === null) {
      setIndex(0);
    } else if (List.length - 1 === index) {
      setIndex(0);
    }
    setIsPlaying(true);
  };
  const toggleSkipBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else if (index === null) {
      setIndex(0);
    } else if (index === 0) {
      setIndex(List.length - 1);
    }
    setIsPlaying(true);
  };
  useEffect(() => {
    if (duration - elapsed === 0 && repeat) {
      setTrack(null);
    } else if (duration - elapsed === 0) {
      toggleSkipForward();
    }
    //  else if (duration - elapsed === 0 && shuffle) {
    //   console.log(sIndex);
    //   let random = null;
    //   do {
    //     random = Math.floor(Math.random() * List.length);
    //   } while (random === index);
    //   console.log(random);
    //   setIndex(random);
    // }
  }, [elapsed]);

  useEffect(() => {
    if (track === null) {
      setTrack(rSong);
    }
  }, [track]);

  // useEffect(() => {
  //   if (shuffle) {
  //     const random = Math.floor(Math.random() * List.length);
  //     setSindex(random);
  //   }
  // }, [shuffle]);

  const handleRepeat = () => {
    setRepeat(!repeat);
    setShuffle(false);
    setRsong(song);
  };
  const handleShuffle = () => {
    setShuffle(!shuffle);
    setRepeat(false);
  };

  function VolmBtns() {
    return mute ? <VolumeOffIcon sx={{ color: 'violet', '&:hover': { color: 'pink' } }} onClick={() => setMute(!mute)} />
      : volume <= 20 ? <VolumeMuteIcon sx={{ color: 'violet', '&:hover': { color: 'pink' } }} onClick={() => setMute(!mute)} />
        : volume <= 75 ? <VolumeDownIcon sx={{ color: 'violet', '&:hover': { color: 'pink' } }} onClick={() => setMute(!mute)} />
          : <VolumeUpIcon sx={{ color: 'violet', '&:hover': { color: 'pink' } }} onClick={() => setMute(!mute)} />;
  }
  return (
    <Div>
      <audio src={track?.songURL} ref={audioPlayer} muted={mute} autoPlay />
      <CustomPaper>
        <IBox>
          {
            track?.imgURL && (
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Stack>
                  <img src={track?.imgURL} alt="song" className="w-full h-[4rem] bg-cover bg-center" />
                </Stack>
                <Stack sx={{ display: 'flex', alignContent: 'center' }}>
                  <p className="text-sm font-thin">{track?.name}</p>
                  <p className="text-sm font-thin">{track?.artist}</p>
                </Stack>
              </Box>
            )
}
        </IBox>
        <DBox>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'flex-end', width: '35%' }} />
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: 'flex', justifyContent: 'flex-start', width: '40%', alignItems: 'center',
              }}
            >
              <RepeatIcon fontSize="small" sx={{ color: repeat ? 'red' : 'violet', '&:hover': { color: 'white' } }} onClick={handleRepeat} />
              <SkipPreviousIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={toggleSkipBack} />

              <FastRewindIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={toggleBackward} />

              {!isPlaying ? <PlayArrowIcon fontSize="large" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={togglePlay} />
                : <PauseIcon fontSize="large" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={togglePlay} />}

              <FastForwardIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={toggleForward} />

              <SkipNextIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white', cursor: 'pointer' } }} onClick={toggleSkipForward} />
              <ShuffleIcon fontSize="small" sx={{ color: shuffle ? 'red' : 'violet', '&:hover': { color: 'white' } }} onClick={handleShuffle} />
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: 'flex', justifyContent: 'flex-start', width: '10%', alignItems: 'center',
              }}
            >
              <VolmBtns />
              <VSlider min={0} max={100} value={volume} onChange={(e, v) => setVolume(v)} />
            </Stack>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: 'flex', justifyContent: 'flex', width: '100%', alignItems: 'center',
            }}
          >
            <Typography sx={{ color: 'silver' }}>{formatTime(elapsed)}</Typography>
            <VSlider thumbless value={elapsed} max={duration} onChange={(e, v) => setDuration(v)} />
            <Typography sx={{ color: 'silver' }}>{formatTime(duration - elapsed)}</Typography>
          </Stack>
        </DBox>
      </CustomPaper>
    </Div>
  );
}

export default Player;
