/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import AddPlaylistCard from '../components/Playlist/AddPlaylistCard';
import MyPlaylistCards from '../components/Playlist/MyPlaylistCards';
import { getMyPlaylists } from '../Api/userApis';

function MyPlaylists() {
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
    <div className="w-full h-screen flex flex-col bg-[#0f021ffd] text-white gap-1">
      <div>
        <Header />
      </div>
      <div className="w-full flex gap-1">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-wrap w-full bg-[#11052c] rounded-md p-4  overflow gap-2">
          <AddPlaylistCard />
          {playlists.map((lists) => (
            <MyPlaylistCards list={lists} key={lists._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPlaylists;
