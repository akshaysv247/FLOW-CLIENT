/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAllTracksOfAnArtist, getSpecificArtist } from '../Api/userApis';
import SongComponent from '../components/SongComponents/SongComponent';

function ArtistOverviewPage() {
  const location = useLocation();
  const { Artist } = location.state;
  const [artist, setArtist] = useState([]);
  const [track, setTrack] = useState([]);
  useEffect(() => {
    const getlist = async () => {
      const result = await getSpecificArtist(Artist);
      if (result.success) {
        setArtist(result.artist);
      }
    };
    const getSong = async () => {
      const result = await getAllTracksOfAnArtist(Artist);
      if (result.success) {
        setTrack(result.songs);
        console.log(result);
      }
    };
    getlist();
    getSong();
  }, []);
  return (
    <div className="w-screen h-[100vh] bg-gradient-to-b from-[#01011d] to-[black] flex flex-col">
      <div>
        <Header />
      </div>
      <div className="w-screen h-full flex">
        <div>
          <Sidebar />
        </div>
        <div className="mt-2 flex flex-col w-full px-2">
          <div className="flex flex-col w-full h-[95vh] bg-[#17175428] px-5 py-2 rounded-md gap-2">
            <div className="w-full h-52 bg-[#391768] rounded-md px-16 flex items-center gap-3">
              <div className="w-32 h-32 bg-black">
                <img src={artist.ImgUrl} alt="img" className="h-full bg-cover bg-center" />
              </div>
              <div className="flex flex-col">
                <p className="font-extrabold text-5xl text-white">{artist.name}</p>
              </div>
              {/* <ToastContainer /> */}
            </div>
            <div className="w-full h-[54vh] bg-transparent rounded-md flex-flex-col gap-2 overflow-auto px-3 py-2">
              {track.map((song) => (
                <SongComponent song={song} key={song._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistOverviewPage;
