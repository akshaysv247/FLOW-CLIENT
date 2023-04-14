import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import LikedSongs from '../components/LibraryComponents/LikedSongs';
import PlaylistCard from '../components/LibraryComponents/PlaylistCard';
import LibraryBar from '../components/LibraryComponents/LibraryBar';
import { getMyPlaylists } from '../Api/userApis';

function LibraryPage1() {
  const { id } = useSelector((state) => state.user);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const result = await getMyPlaylists(id);
      console.log(result);
      if (result.success) {
        setPlaylists(result.myPlaylists);
      }
    };
    invoke();
  }, []);
  return (
    <div className="w-screen h-screen text-white bg-[#0b0618]">
      <div>
        <Header />
      </div>
      <div className="w-full sm:h-[560px] flex gap-2 p-2">
        <div>
          <Sidebar />
        </div>
        <div className="p-2">
          <div>
            <LibraryBar />
          </div>
          <div className="flex flex-wrap gap-3 h-550 overflow-auto">
            <LikedSongs />
            {playlists.map((playlist) => (<PlaylistCard playlist={playlist} />))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryPage1;
