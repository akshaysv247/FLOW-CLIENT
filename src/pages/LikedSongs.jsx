import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import SongComponent from '../components/SongComponents/SongComponent';
import { getLikedSongs } from '../Api/userApis';

function LikedSongs() {
  const { id } = useSelector((state) => state.user);
  const artistId = useSelector((state) => state.artist.id);

  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      if (artistId) {
        const response = await getLikedSongs(artistId);
        if (response.success) {
          setSongs(response.songs);
        }
      }
      const response = await getLikedSongs(id);
      if (response.success) {
        setSongs(response.songs);
      }
    };
    invoke();
  }, []);
  return (
    <div className="w-screen h-screen bg-[#0b0618] text-white flex flex-col gap-1">
      <div>
        <Header />
      </div>
      <div className="flex gap-2">
        <div><Sidebar /></div>
        <div className="p-3 flex flex-col gap-1">
          <div className="bg-gradient-to-r from-[#7d1aa1] w-[90vw] h-28 flex items-center justify-between px-2 rounded-md">
            <h1 className="text-3xl font-semibold">Liked Songs</h1>
            <h1 className="text-xl font-extrabold">
              {songs.length}
              {' '}
              songs
            </h1>
          </div>
          <div className="w-full h-550 rounded-md p-3 flex flex-col gap-2 overflow-auto">
            {songs.map((song) => (
              <SongComponent song={song} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikedSongs;
