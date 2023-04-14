/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { getAllTracks } from '../../Api/adminApi';
import Track from './AdminComps/Track';

function songs() {
  // eslint-disable-next-line no-shadow
  const [songs, setSongs] = useState([]);
  const [change, setChange] = useState('');
  useEffect(() => {
    const getAllSongs = async () => {
      const response = await getAllTracks();
      console.log(response);
      if (response.success) {
        console.log(response.songs);
        setSongs(response.songs);
      }
    };
    getAllSongs();
  }, []);
  useEffect(() => {
    toast.success(change);
  }, [change]);
  return (
    <div className="w-screen h-screen bg-black flex">
      <div className="m-3">
        <AdminSidebar />
      </div>
      <ToastContainer />
      <div className="w-screen h-screen  my-3 bg-[#0b0b2ee3] text-white">
        <div className="flex justify-between">
          <h1 className="text-3xl m-8 font-extrabold">SONGS</h1>
          <Link to="/admin/home">
            <p className="m-12">HOME</p>
          </Link>
        </div>
        <div className="grid gap-9">
          <div className="w-[98%] flex flex-col p-3 m-3 border gap-2 border-[#15157e] h-96 overflow-auto">
            { songs.map((song) => (
              <Track key={song._id} song={song} setChange={setChange} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link to="/admin/addTrack">
              <Button>ADD TRACK</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default songs;
