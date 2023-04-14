import React from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ArtistHeader from '../Header/ArtistHeader';
import ArtistSidebar from '../Sidebar/ArtistSidebar';

function CreatePlaylist() {
  const { name } = useSelector((state) => state.artist);
  return (
    <div className="w-full h-[100vh] flex flex-col bg-[#140b3e] gap-1">
      <div>
        <ArtistHeader />
      </div>
      <div className="w-full h-[80vh] flex gap-1">
        <div className="h-full">
          <ArtistSidebar />
        </div>
        <div className="flex flex-col w-full bg-[#13013e] rounded-md p-4  overflow gap-2">
          <div className="w-full h-96 flex px-20 py-10 bg-gradient-to-r from-[#2d0583] to-black gap-4 items-center">
            <div className="h-40 w-40 bg-[#8080806f] rounded-md flex justify-center items-center">
              <AddIcon sx={{ fontSize: '100px', color: 'snow' }} />
            </div>
            <div>
              <p className="text-5xl text-white font-semibold"># Playlist Name</p>
              <p className="text-name">{name}</p>
            </div>
          </div>
          <div className="w-full h-full bg-gray-500">
            <div>
              <button
                type="button"
                className="w-full focus:outline-none text-white bg-[#270360] hover:bg-[#270360] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-[#6158bc] dark:hover:bg-[#270360] dark:focus:ring-purple-900"
              >
                Add Songs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;
