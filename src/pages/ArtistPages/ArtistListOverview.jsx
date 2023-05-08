import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArtistHeader from '../../components/Header/ArtistHeader';
import ArtistSidebar from '../../components/Sidebar/ArtistSidebar';
import PlaylistOverview from '../../components/Playlist/PlaylistOverview';
import { getSpecificPlaylist } from '../../Api/artistApi';

function ArtistListOverview() {
  const location = useLocation();
  const { playlistId } = location.state;
  const [list, setList] = useState({});

  useEffect(() => {
    const getlist = async () => {
      const result = await getSpecificPlaylist(playlistId);
      if (result.success) {
        setList(result.playlist);
      }
    };
    getlist();
  }, []);
  return (
    <div className="w-screen h-full bg-gradient-to-b from-[#01011d] to-[black] flex flex-col">
      <div>
        <ArtistHeader />
      </div>
      <div className="w-screen h-full flex">
        <div>
          <ArtistSidebar />
        </div>
        <div className="mt-2 flex flex-col w-full px-2">
          <PlaylistOverview list={list} />
        </div>
      </div>
    </div>
  );
}

export default ArtistListOverview;
