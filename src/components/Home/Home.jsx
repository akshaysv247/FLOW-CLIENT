/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import SongCard from '../SongComponents/SongCard';
import { getAllTracks, getAllArtist } from '../../Api/userApis';
import ArtistCard from '../Cards/ArtistCard';
import { songActions } from '../../Redux/Slice/SongSlice';

function Home() {
  // const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toasting, setToasting] = useState('');
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [song, setSong] = useState(null);
  useEffect(() => {
    const getAllSongs = async () => {
      const result = await getAllTracks();
      if (result.success) {
        setSongs(result.songs);
        dispatch(songActions.setPlaylist({
          list: result.songs,
        }));
        console.log(song);
      }
    };
    const getAllArtists = async () => {
      const result = await getAllArtist();
      if (result.success) {
        console.log(result.artists);
        setArtists(result.artists);
        console.log(artists);
      }
    };
    getAllSongs();
    getAllArtists();
  }, []);
  { toasting && toast.success(toasting); }
  return (
    <div className="w-screen h-screen text-white bg-[#0b0618] overflow-hidden">
      <div className="w-full h-20">
        <Header />
        <ToastContainer />
      </div>
      <div className="w-full sm:h-[560px] flex gap-2">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className=" w-full h-fit p-2 overflow-auto">
          <p className="text-2xl font-extrabold">SONGS</p>
          <div className="flex flex-wrap h-250 gap-2 p-3 overflow-auto">
            {songs.map((track) => (
              <SongCard song={track} setSong={setSong} key={track._id} setToasting={setToasting} />
            ))}
          </div>
          <p className="text-2xl font-extrabold">ARTISTS</p>
          <div className="flex flex-wrap h-300 gap-2 p-3 overflow-auto">
            {artists.map((artist) => (
              <ArtistCard artist={artist} key={artist._id} setToasting={setToasting} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
