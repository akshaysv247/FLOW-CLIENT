/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import InputBase from '@mui/material/InputBase';

import {
  Box, Menu, MenuItem, styled, Typography,
} from '@mui/material';
import { artistAcions } from '../../Redux/Slice/ArtistSlice';
import Logo from '../Logo/Logo';
import SearchResult from '../SearchComponent/SearchResult';
import { search } from '../../Api/artistApi';

// eslint-disable-next-line no-unused-vars
const ArtistBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',

}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#240d42c4',
  '&:hover': {
    backgroundColor: 'purple',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function ArtistHeader() {
  const { name, ImgURL } = useSelector((state) => state.artist);
  const [searching, setSearching] = useState('');
  const [result, setResult] = useState([]);
  const [arts, setArts] = useState([]);
  const [plays, setPlays] = useState([]);
  const [item, setItem] = useState('Tracks');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const response = await search(searching, item);
    console.log(response, 'resoooo');
    if (response.success) {
      if (response.tracks) {
        setArts([]);
        setPlays([]);
        setResult(response.tracks);
      }
      if (response.artists) {
        setResult([]);
        setPlays([]);
        setArts(response.artists);
      }
      if (response.playlists) {
        setResult([]);
        setArts([]);
        setPlays(response.playlists);
      }
      console.log(result, 'resss');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handleChange = (e) => {
    setSearching(e.target.value);
  };

  const handleLogout = () => {
    dispatch(artistAcions.setArtistLogout());
    navigate('/artist/login');
  };
  const handleProfile = () => {
    navigate('/artist/profile');
  };
  return (
    <div className="w-full sm:w-full h-20 bg-[#220148] text-white flex items-center justify-between">
      <div className="flex h-full ">
        <div className="hidden sm:flex justify-center items-center">
          <Logo />
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 sm:px-16">
        <div className="w-20 h-12 bg-white hidden sm:block  rounded-lg">
          <div className="flex justify-center mt-3" onClick={() => navigate('/artist/home')}>
            <HomeIcon sx={{ color: 'black' }} />
          </div>
        </div>
        <div className="">
          <div className="bg-[#0301035c] sm:w-fit px-2 h-12 flex items-center justify-center rounded-lg">
            <form onSubmit={handleSubmit} className="flex items-center">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searching}
                  onChange={handleChange}
                />
              </Search>
              <select value={item} className="bg-[#240d42c4] h-[2.3rem] rounded-md text-sm text-gray-500" onChange={(e) => setItem(e.target.value)}>
                <option>Tracks</option>
                {/* <option>Playlist</option> */}
                {/* <option>Artist</option> */}
              </select>
            </form>
            {searching && <SearchResult result={result} arts={arts} plays={plays} />}
          </div>
        </div>
        <div>
          <ArtistBox onClick={() => setOpen(true)}>
            {ImgURL ? (
              <Avatar
                sx={{ width: '30px', height: '30px' }}
                src={ImgURL}
              />
            )
              : (
                <Avatar
                  sx={{ width: '30px', height: '30px' }}
                  src="https://w7..com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
                />
              )}
            <Typography varient="span">{name}</Typography>
          </ArtistBox>
          <Menu
            onClose={() => setOpen(false)}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default ArtistHeader;
