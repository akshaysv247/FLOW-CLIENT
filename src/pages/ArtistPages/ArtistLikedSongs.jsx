/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArtistHeader from '../../components/Header/ArtistHeader';
import ArtistSidebar from '../../components/Sidebar/ArtistSidebar';
import { getLikedSongs, getMyPlaylists } from '../../Api/artistApi';
import SongComponent from '../../components/SongComponents/SongComponent';
import AddtoPlaylist from '../../components/Playlist/AddtoPlaylist';
import Report from '../../components/HelperComponents/Report';

function ArtistLikedSongs() {
  const { id } = useSelector((state) => state.artist);

  const [songs, setSongs] = useState([]);
  const [add, setAdd] = useState(false);
  const [list, setList] = useState([]);
  const [track, setTrack] = useState('');
  const [report, setReport] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const invoke = async () => {
      const response = await getLikedSongs(id);
      if (response.success) {
        setSongs(response.songs);
      }
    };
    invoke();
  }, []);
  useEffect(() => {
    const invoke = async () => {
      const result = await getMyPlaylists(id);
      if (result.success) {
        console.log(result, 'succcc');
        setList(result.myPlaylists);
      }
    };
    invoke();
  }, [add]);
  useEffect(() => { toast(message); }, [message]);
  const handleClose = () => {
    setAdd(false);
  };
  return (
    <div className="w-screen h-screen bg-[#0b0618] text-white flex flex-col gap-1">
      <div>
        <ArtistHeader />
      </div>
      <ToastContainer />
      <div className="flex gap-2">
        <div><ArtistSidebar /></div>
        <div className="p-3 flex flex-col gap-1">
          <div className="bg-gradient-to-r from-[#7d1aa1] w-[90vw] h-28 flex items-center justify-between px-2 rounded-md">
            <h1 className="text-3xl font-semibold">Liked Songs</h1>
            <h1 className="text-xl font-extrabold">
              {songs.length}
              {' '}
              songs
            </h1>
          </div>
          <div className="w-full h-550 rounded-md p-3 flex flex-col gap-2 overflow-auto">
            {songs.map((song) => (
              <SongComponent
                song={song}
                setAdd={setAdd}
                setTrack={setTrack}
                setReport={setReport}
              />
            ))}
          </div>
          {add && (
            <div className="w-[46vw] h-[35vh] absolute top-52 left-1/4 bg-[#0f031cdd] rounded-md">
              <p className="text-xl font-extrabold px-4 hover:cursor-pointer" onClick={handleClose}>X</p>
              <div className=" flex flex-wrap overflow-auto px-2 gap-2 mt-2">
                {list.map((el) => (
                  <AddtoPlaylist
                    list={el}
                    track={track}
                    setAdd={setAdd}
                    setMessage={setMessage}
                    key={el._id}
                  />
                ))}
              </div>
            </div>
          )}
          {report && <Report setReport={setReport} track={track} setMessage={setMessage} />}
        </div>
      </div>
    </div>
  );
}

export default ArtistLikedSongs;
