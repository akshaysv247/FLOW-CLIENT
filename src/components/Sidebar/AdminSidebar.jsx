/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import HomeIcon from '@mui/icons-material/Home';
import CopyrightIcon from '@mui/icons-material/Copyright';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Person3Icon from '@mui/icons-material/Person3';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import Tooltip from '@mui/material/Tooltip';
import Logo from '../../Assets/Logo/flowLOGO.png';
import arrow from '../../Assets/Logo/Arrow.png';
import { adminActions } from '../../Redux/Slice/AdminSlice';
// import ava from '../../Assets/Avatars/fan1.webp';

function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(adminActions.setAdminLogout());
    navigate('/admin/login');
  };
  return (
    <div className="flex">
      <div
        className={`${
          open ? 'w-[17rem]' : 'w-20'
        } p-5 pt-5 duration-300 h-screen bg-gradient-to-b from-[#150840] to-[#060117] rounded-md transition-all ease-in-out relative`}
      >
        <img
          src={arrow}
          alt="arrow"
          className={`absolute cursor-pointer rounded-full
            -right-3 top-9 w-7 border-2 border-black ${open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center justify-center">
          <img
            src={Logo}
            alt="Logo"
            className="cursor-pointer duration-500  w-28"
          />
        </div>
        <div className="flex text-white">
          <ul>
            <Link to="/admin/home">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="HOME" placement="right-end">
                  <HomeIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>HOME</h1>
              </li>
            </Link>
            <Link to="/admin/users">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="USERS" placement="right-end">
                  <AccountBoxIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>USERS</h1>
              </li>
            </Link>
            <Link to="/admin/artists">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="ARTISTS" placement="right-end">
                  <Person3Icon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>ARTISTS</h1>
              </li>
            </Link>
            {/* <Link to="/admin/library">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="LIBRARY" placement="right-end">
                  <LibraryMusicIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>LIBRARY</h1>
              </li>
            </Link> */}
            <Link to="/admin/tracks">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="TRACKS" placement="right-end">
                  <AlbumIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>TRACKS</h1>
              </li>
            </Link>
            {/* <Link to="/admin/createPlaylist">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="PLAYLISTS" placement="right-end">
                  <LibraryAddIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>PLAYLISTS</h1>
              </li>
            </Link> */}
            <Link to="/admin/categories">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="CATEGORIES" placement="right-end">
                  <CategoryIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>CATEGORIES</h1>
              </li>
            </Link>
            <Link to="/admin/copyrights">
              <li className="flex font-medium mt-2 hover:text-[#f76cebb0] items-center">
                <Tooltip title="COPYRIGHTS" placement="right-end">
                  <CopyrightIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>COPYRIGHTS</h1>
              </li>
            </Link>
            <li className="flex font-medium mt-2 hover:text-[#f76cebb0] items-center" onClick={handleLogout}>
              <Tooltip title="LOG OUT" placement="right-end">
                <LogoutIcon fontSize="large" />
              </Tooltip>
              <h1 className={`ml-3 ${!open && 'scale-0'}`}>LOG OUT</h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
