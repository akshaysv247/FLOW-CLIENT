/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArtistHeader from '../../components/Header/ArtistHeader';
import ArtistSidebar from '../../components/Sidebar/ArtistSidebar';
import ArtistAddCard from '../../components/Playlist/ArtistAddCard';
import { getMyPlaylists } from '../../Api/artistApi';
import ArtistListCard from '../../components/Playlist/ArtistListCard';

function ArtistPlaylist() {
  const { id } = useSelector((state) => state.artist);
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
    <div className="w-full h-[100vh] bg-[#0f021ffd] text-white gap-1">
      <div>
        <ArtistHeader />
      </div>
      <div className="w-full flex gap-2">
        <div>
          <ArtistSidebar />
        </div>
        <div className="flex flex-wrap w-full bg-[#11052c] rounded-md p-4  overflow-auto gap-2">
          <ArtistAddCard />
          {playlists.map((lists) => (
            <ArtistListCard list={lists} key={lists._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistPlaylist;
