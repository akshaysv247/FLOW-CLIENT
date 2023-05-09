/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArtistHeader from '../Header/ArtistHeader';
import ArtistSidebar from '../Sidebar/ArtistSidebar';
import { getAllTracks } from '../../Api/artistApi';
import ArtistSongComp from './ArtistSongComp';
// import Player from '../Player/Player';

function Track() {
  const { id } = useSelector((state) => state.artist);
  const [songs, setSongs] = useState([]);
  // const [song, setSong] = useState([]);
  const [message, setMessage] = useState('');
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
  useEffect(() => {
    toast(message);
  }, [message]);

  return (
    <div className="w-[100%] h-[100vh] bg-[#050514] flex flex-col text-white">
      {message && <ToastContainer />}
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
              <div>
                <ArtistSongComp track={track} key={track._id} setMessage={setMessage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
