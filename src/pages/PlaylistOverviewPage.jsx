import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlaylistOverview from '../components/Playlist/PlaylistOverview';
import Sidebar from '../components/Sidebar/Sidebar';
import { getSpecificPlaylist } from '../Api/userApis';

function PlaylistOverviewPage() {
  const location = useLocation();
  const { playlistId } = location.state;
  const [list, setList] = useState({});

  useEffect(() => {
    console.log('ethhi');
    const getlist = async () => {
      const result = await getSpecificPlaylist(playlistId);
      if (result.success) {
        setList(result.playlist);
      }
    };
    getlist();
  }, []);

  console.log(list, 'lists');
  return (
    <div className="w-screen h-full bg-gradient-to-b from-[#01011d] to-[black] flex flex-col">
      <div>
        <Header />
      </div>
      <div className="w-screen h-full flex">
        <div>
          <Sidebar />
        </div>
        <div className="mt-2 flex flex-col w-full px-2">
          <PlaylistOverview list={list} />
        </div>
      </div>
    </div>
  );
}

export default PlaylistOverviewPage;
