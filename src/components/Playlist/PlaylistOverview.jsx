/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaylistSong from '../SongComponents/PlaylistSong';
import Report from '../HelperComponents/Report';

function PlaylistOverview({ list }) {
  const [track, setTrack] = useState('');
  const [report, setReport] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => { toast(message); }, [message]);
  return (
    <div className="flex flex-col w-full h-[95vh] bg-[#17175428] px-5 py-2 rounded-md gap-2">
      <div className="w-full h-52 bg-[#391768] rounded-md px-16 flex items-center gap-3">
        <div className="w-32 h-32 bg-black">
          <img src={list?.imgURL} alt="img" className="h-full bg-cover bg-center" />
        </div>
        <div className="flex flex-col">
          <p className="font-extrabold text-5xl text-white">{list.name}</p>
          <p className="text-white">{list?.owner?.name}</p>
        </div>
        <ToastContainer />
      </div>
      {report && <Report setReport={setReport} track={track} setMessage={setMessage} />}
      <div className="w-full h-[54vh] bg-transparent rounded-md flex-flex-col gap-2 overflow-auto px-3 py-2">
        {list?.songs?.map((song) => (
          // eslint-disable-next-line max-len
          <PlaylistSong key={song._id} song={song} listId={list._id} setTrack={setTrack} setReport={setReport} />
        ))}
      </div>
    </div>
  );
}

export default PlaylistOverview;
