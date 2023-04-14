/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
// import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box, Menu, MenuItem, styled, Typography,
} from '@mui/material';
import { userActions } from '../../Redux/Slice/UserSlice';
import { search } from '../../Api/userApis';
import Logo from '../Logo/Logo';

// eslint-disable-next-line no-unused-vars
const UserBox = styled(Box)(({ theme }) => ({
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

function Header() {
  const { name, ImgURL } = useSelector((state) => state.user);
  const [searching, setSearching] = useState('');
  const [item, setItem] = useState('Tracks');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searching);
    console.log(item);
    const response = await search(searching, item);
    console.log(response);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleLogout = () => {
    dispatch(userActions.setLogout());
    navigate('/');
  };

  return (
    <div className="w-fit sm:w-screen h-20 bg-[#240d42c4] text-white flex items-center justify-between">
      <div>
        <div className="hidden sm:block">
          <Logo />
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 sm:px-16">
        <div className="w-20 h-12 bg-white  rounded-lg">
          <div className="flex justify-center mt-3" onClick={() => navigate('/home')}>
            <HomeIcon sx={{ color: 'black' }} />
          </div>
        </div>
        <div className="">
          <div className="bg-[#0301035c] sm:w-fit px-2 h-12 flex items-center justify-center rounded-lg">
            <form onSubmit={handleSearch} className="flex items-center gap-1">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searching}
                  onChange={(e) => setSearching(e.target.value)}
                  onKeyDown={handleSubmit}
                />
              </Search>
              <select value={item} className="bg-[#240d42c4] h-[2.3rem] text-sm text-gray-500 rounded-md" onChange={(e) => setItem(e.target.value)}>
                <option>Tracks</option>
                <option>Playlist</option>
                <option>Artist</option>
              </select>
            </form>
          </div>
        </div>
        <div>
          <UserBox onClick={() => setOpen(true)}>
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
          </UserBox>
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
            <Link to="/profile">
              <MenuItem>Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
