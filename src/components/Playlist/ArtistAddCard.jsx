/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPlaylist } from '../../Api/artistApi';

function ArtistAddCard() {
  const { id } = useSelector((state) => state.artist);
  const navigate = useNavigate();
  const addPlaylist = async () => {
    const result = await addNewPlaylist(id);
    if (result.success) {
      console.log(result.message);
      navigate('/artist/new-playlist', { state: { playlist: result.playlist } });
    }
  };
  return (
    <div className="w-52 h-60 bg-gradient-to-r from-[#30025c] to-[black] rounded-md flex flex-col items-center py-2">
      <div
        className="flex justify-center items-center h-44 w-48 bg-[#9e88c7] rounded-md hover:scale-105"
        onClick={addPlaylist}
      >
        <LibraryAddIcon sx={{ fontSize: '150px', color: 'snow' }} />
      </div>
      <div className="h-16 flex items-center">
        <h1 className="text-2xl font-extrabold">Add New Playlist</h1>
      </div>
    </div>
  );
}

export default ArtistAddCard;
