/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import SongComponent from '../SongComponents/SongComponent';

function PlaylistOverview({ list }) {
  // const { owner, songs } = list;
  console.log(list, 'owner');
  return (
    <div className="flex flex-col w-full h-full bg-[#17175428] px-5 py-2 rounded-md gap-2">
      <div className="w-full h-52 bg-[#391768] rounded-md px-16 flex items-center gap-3">
        <div className="w-32 h-32 bg-black">
          <img src={list?.imgURL} alt="img" className="h-full bg-cover bg-center" />
        </div>
        <div className="flex flex-col">
          <p className="font-extrabold text-5xl text-white">{list.name}</p>
          <p className="text-white">{list?.owner?.name}</p>
        </div>
      </div>
      <div className="w-full h-full bg-[#ffffff0f] rounded-md flex-flex-col gap-2 overflow-auto px-3 py-2">
        {list?.songs?.map((song) => (
          <SongComponent key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default PlaylistOverview;
