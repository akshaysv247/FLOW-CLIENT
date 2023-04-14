/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import ArtistHeader from '../Header/ArtistHeader';
import ArtistSidebar from '../Sidebar/ArtistSidebar';
import { getAllTracks } from '../../Api/artistApi';
// import Player from '../Player/Player';

function Track() {
  const { id } = useSelector((state) => state.artist);
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState([]);
  useEffect(() => {
    const getAllSongs = async () => {
      const result = await getAllTracks(id);
      console.log(result);
      if (result.success) {
        console.log(result.songs);
        setSongs(result.songs);
      }
    };
    getAllSongs();
  }, []);

  return (
    <div className="w-[100%] h-[100vh] bg-[#050514] flex flex-col text-white">
      <div className="w-full h-20">
        <ArtistHeader />
      </div>
      <div className="w-full h-full ml-3 flex">
        <div className="h-full">
          <ArtistSidebar />
        </div>
        <div className="flex-auto bg-transparent rounded-md p-5 m-1">
          <div className="flex justify-between">
            <p className="text-2xl font-extrabold">SONGS</p>
            <Link to="/artist/addTrack">
              <Button variant="contained">ADD TRACK</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2 p-3 overflow-scroll">
            {songs.map((track) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions,
              // jsx-a11y/click-events-have-key-events
              // eslint-disable-next-line max-len
              // eslint-disable-next-line no-underscore-dangle,jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
              <div
                key={track?._id}
                className="w-full h-14 border rounded-md flex"
                onClick={() => {
                  setSong(track);
                }}
              >
                <img src={track.imgURL} alt="img" className="h-12 w-16" />
                <div className="px-2">
                  <h1>{ track.name }</h1>
                  <p className="text-sm font-extralight">{ track.artist }</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div>
        <Player song={song} />
      </div> */}
    </div>
  );
}

export default Track;
