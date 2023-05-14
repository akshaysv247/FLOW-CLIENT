import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LibraryBar from '../../components/LibraryComponents/LibraryBar';
import ArtistHeader from '../../components/Header/ArtistHeader';
import ArtistSidebar from '../../components/Sidebar/ArtistSidebar';
import ArtistLiked from '../../components/LibraryComponents/ArtistLiked';
import ArtistsPlayCard from '../../components/LibraryComponents/ArtistsPlayCard';
import { getMyPlaylists } from '../../Api/artistApi';

function ArtistLibraryPage() {
  const artistId = useSelector((state) => state.artist.id);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const result = await getMyPlaylists(artistId);
      if (result.success) {
        setPlaylists(result.myPlaylists);
      }
    };
    invoke();
  }, []);
  return (
    <div className="w-screen h-screen text-white bg-[#0b0618]">
      <div>
        <ArtistHeader />
      </div>
      <div className="w-full sm:h-[560px] flex gap-2 p-2">
        <div>
          <ArtistSidebar />
        </div>
        <div className="p-2">
          <div>
            <LibraryBar />
          </div>
          <div className="flex flex-wrap gap-3 h-550 overflow-auto">
            <ArtistLiked />
            {playlists.map((playlist) => (<ArtistsPlayCard playlist={playlist} />))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistLibraryPage;
