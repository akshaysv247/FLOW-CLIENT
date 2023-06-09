/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { songActions } from '../../Redux/Slice/SongSlice';
import { LikeSong, checkLikedSong, removeFromPlaylist } from '../../Api/userApis';

const ITEM_HEIGHT = 48;

function PlaylistSong({
  song, listId, setTrack, setReport,
}) {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const likeSong = async () => {
    const result = await LikeSong(song._id, id);
    if (result.success) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  useEffect(() => {
    const invoke = async () => {
      const result = await checkLikedSong(id, song._id);
      if (result.success) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    invoke();
  }, []);
  const playsong = () => {
    dispatch(
      songActions.setSongDetails({
        song,
      }),
    );
  };
  const handlePlaylist = async () => {
    const result = await removeFromPlaylist(listId, song._id);
    console.log(result, 'resslt');
    if (result.success) {
      setDeleted(true);
    }
  };
  const handleReport = () => {
    setReport(true);
    setTrack(song._id);
  };
  if (!deleted) {
    return (
      <div key={song._id} className="w-full h-16 border rounded-md flex justify-between">
        <div className="h-full w-1/2 flex items-center gap-2">
          <img src={song.imgURL} alt="Img" className="h-14 w-14 rounde-md" />
          <div className="text-white">
            <p className="text-lg font-extrabold">{song.name}</p>
            <p>{song.artist}</p>
          </div>
        </div>
        <div className="flex items-center h-full gap-2 mr-5">
          {liked ? <FavoriteIcon sx={{ color: 'red', fontSize: '30px' }} onClick={likeSong} /> : <FavoriteBorderIcon sx={{ fontSize: '30px' }} onClick={likeSong} /> }
          {playing ? <PauseCircleIcon sx={{ color: '#7d1aa1', fontSize: '40px' }} onClick={() => setPlaying(!playing)} /> : <PlayCircleFilledWhiteIcon sx={{ color: '#7d1aa1', fontSize: '40px' }} onClick={playsong} />}
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handlePlaylist}>
              Remove from Playlist
            </MenuItem>
            <MenuItem onClick={handleReport}>Report</MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
}

export default PlaylistSong;
