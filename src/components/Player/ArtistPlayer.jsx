/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

function ArtistPlayer({ songUrl, imgUrl }) {
  return (
    <div className="flex w-[100%] items-center h-full py-2">
      <div className="w-40">
        <img src={{ imgUrl }} alt="songImg" className="w-32 h-full" />
      </div>
      <div className="w-[100%]">
        <AudioPlayer
          style={{ backgroundColor: '#f5f !important' }}
          autoPlay
          src={songUrl}
          onPlay={() => console.log('onPlay')}
        />
      </div>
    </div>
  );
}

export default ArtistPlayer;
