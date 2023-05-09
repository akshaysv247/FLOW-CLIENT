import React from 'react';
import ArtistHeader from '../Header/ArtistHeader';
import ArtistSidebar from '../Sidebar/ArtistSidebar';
import ArtistDashbord from '../ArtistComponents/ArtistDashbord';

function ArtistHome() {
  return (
    <div className="w-[100%] h-[100vh] bg-[#050514] flex flex-col text-white gap-1 overflow-hidden">
      <div className="w-full h-20">
        <ArtistHeader />
      </div>
      <div className="w-full h-fit ml-3 flex">
        <div className="h-fit">
          <ArtistSidebar />
        </div>
        <div className="flex-auto h-full bg-transparent rounded-md p-2">
          <ArtistDashbord />
        </div>
      </div>
    </div>
  );
}

export default ArtistHome;
