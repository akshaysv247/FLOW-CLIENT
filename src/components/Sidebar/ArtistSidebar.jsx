/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
// import FeedIcon from '@mui/icons-material/Feed';
import Tooltip from '@mui/material/Tooltip';
import arrow from '../../Assets/Logo/Arrow.png';

function ArtistSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex ">
      <div
        className={`${
          open ? 'w-[16.5rem]' : 'w-20'
        } p-5 pt-5 duration-300 h-[500px] sm:h-720 bg-gradient-to-b from-[#270d469c] to-[#060117] rounded-md transition-all ease-in-out relative`}
      >
        <img
          src={arrow}
          alt="arrow"
          className={`absolute cursor-pointer rounded-full
            -right-3 top-9 w-7 border-2 border-black ${open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex text-white">
          <ul>
            <Link to="/artist/library">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="LIBRARY" placement="right-end">
                  <LibraryMusicIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>LIBRARY</h1>
              </li>
            </Link>
            <Link to="/artist/liked-songs">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="LIKED SONGS" placement="right-end">
                  <HeartBrokenIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>LIKED SONGS</h1>
              </li>
            </Link>
            <Link to="/artist/create-playlist">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="CREATE PLAYLIST" placement="right-end">
                  <LibraryAddIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>CREATE PLAYLIST</h1>
              </li>
            </Link>
            <Link to="/artist/track">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="TRACKS" placement="right-end">
                  <AlbumIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>TRACKS</h1>
              </li>
            </Link>
            {/* <Link to="/artist/feeds">
              <li className="flex font-medium mt-4 hover:text-[#f76cebb0] items-center">
                <Tooltip title="FEEDS" placement="right-end">
                  <FeedIcon fontSize="large" />
                </Tooltip>
                <h1 className={`ml-3 ${!open && 'scale-0'}`}>FEEDS</h1>
              </li>
            </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ArtistSidebar;
