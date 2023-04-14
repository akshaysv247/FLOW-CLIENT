import React from 'react';
import ArtistHeader from '../../components/Header/ArtistHeader';
import ArtistProfile from '../../components/Profile/ArtistProfile';
import ArtistSidebar from '../../components/Sidebar/ArtistSidebar';

function ArtistProfilePage() {
  return (
    <div className="container w-[100%] h-full bg-[#050514] flex flex-col text-white">
      <div className="w-full h-20">
        <ArtistHeader />
      </div>
      <div className="w-full h-full flex">
        <div className="h-full ml-3">
          <ArtistSidebar />
        </div>
        <div className="flex flex-col justify-center w-full">
          <ArtistProfile />
        </div>
      </div>
    </div>
  );
}

export default ArtistProfilePage;
