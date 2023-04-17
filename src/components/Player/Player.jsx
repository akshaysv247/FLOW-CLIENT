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
// ----------------------------------------------------------------
import { getCommonSongs } from '../../Api/userApis';
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
  const played = useSelector((state) => state.played);
  console.log(played, 'plyed');
  const [track, setTrack] = useState('');
  const audioPlayer = useRef();
  // const [index, setIndex] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [nextSong, setNextSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setTrack(song);
    console.log(track, 'track');
    async function invoke() {
      setPlaylist(null);
      const list = await getCommonSongs(track.category, track._id);
      console.log(list.songs, 'list');
      if (list.songs.length > 1) {
        setPlaylist(list.songs);
      } else {
        setNextSong(list.songs[0]);
      }
    }
    invoke();
  }, [song]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }
    if (song) {
      setIsPlaying(true);
    }
    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
    }
  }, [
    volume,
    isPlaying,
    song,
  ]);

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
    // if (index >= playlist.length - 1) {
    //   setIndex(0);
    //   audioPlayer.current.src = playlist[0];
    //   audioPlayer.current.play();
    // } else {
    //   setIndex((prev) => prev + 1);
    //   audioPlayer.current.src = playlist[index + 1];
    // }
    if (nextSong) {
      audioPlayer.current.src = nextSong.songURL;
      setTrack(nextSong);
      audioPlayer.current.play();
    } else if (playlist.length > 0) {
      audioPlayer.current.src = playlist[0].songURL;
      audioPlayer.current.play();
    }
  };
  const toggleSkipBack = () => {
    // if (index > 0) {
    //   setIndex((prev) => prev - 1);
    //   audioPlayer.current.src = playlist[index - 1];
    //   audioPlayer.current.play();
    // }

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
                  <img src={track?.imgURL} alt="song" className="w-full h-[4rem]" />
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
              <SkipPreviousIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={toggleSkipBack} />

              <FastRewindIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={toggleBackward} />

              {!isPlaying ? <PlayArrowIcon fontSize="large" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={togglePlay} />
                : <PauseIcon fontSize="large" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={togglePlay} />}

              <FastForwardIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={toggleForward} />

              <SkipNextIcon fontSize="small" sx={{ color: 'violet', '&:hover': { color: 'white' } }} onClick={toggleSkipForward} />
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
