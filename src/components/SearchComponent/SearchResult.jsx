/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import SearchSong from './SearchSong';
import ArtistCard from '../Cards/ArtistCard';
import MyPlaylistCards from '../Playlist/MyPlaylistCards';

function SearchResult({ result, arts, plays }) {
  return (
    <div className="absolute top-20 bg-[#790be056] w-[45vw] h-[40vh] flex flex-col items-center justify-start">
      {result && (
      <div className="w-full px-4 py-2 h-[40vh] flex flex-col gap-2 items-center overflow-auto">
        {result.map((item) => (
          <SearchSong item={item} key={item._id} />
        ))}
      </div>
      )}
      {arts && (
        <div className="flex flex-wrap px-4 py-2 h-[40vh] w-[45vw] gap-2">
          {arts.map((item) => (
            <ArtistCard artist={item} />
          ))}
        </div>
      )}
      {
        plays && (
          <div className="flex flex-wrap px-4 py-2 h-[40vh] w[45vw] gap-2 justify-start">
            {plays.map((item) => (
              <MyPlaylistCards list={item} />
            ))}
          </div>
        )
      }
    </div>
  );
}

export default SearchResult;
