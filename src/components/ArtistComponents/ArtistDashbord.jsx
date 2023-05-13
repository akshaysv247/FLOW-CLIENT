/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTracks, getHiddenSongsOfAnArtist, getFollowers, getAllSongs,
} from '../../Api/artistApi';
import ArtistCharts from '../Charts/ArtistCharts';
import ArtistSongCard from '../SongComponents/ArtistSongCard';
import { songActions } from '../../Redux/Slice/SongSlice';

function ArtistDashbord() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.artist);
  const [noOfTrack, setNoOfTrack] = useState(0);
  const [hidden, setHidden] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const result = await getAllTracks(id);
      if (result.success) {
        setNoOfTrack(result.songs.length);
      }
    };
    const prevoke = async () => {
      const result = await getHiddenSongsOfAnArtist(id);
      if (result.success) {
        setHidden(result.songs.length);
      }
    };
    const func = async () => {
      const result = await getFollowers(id);
      if (result.success) {
        setFollowers(result.followers.length);
      }
    };
    const gettingSongs = async () => {
      const result = await getAllSongs();
      if (result.success) {
        setSongs(result.songs);
        dispatch(songActions.setPlaylist({
          list: result.songs,
        }));
      }
    };
    invoke();
    func();
    prevoke();
    gettingSongs();
  }, []);
  return (
    <div className="w-full h-[100vh] overflow-auto">
      <div className="w-full h-fit  flex flex-wrap gap-2 py-2 px-2 justify-center">
        <div className="w-1/3 h-[15vh] bg-[#460a6b] flex justify-center rounded-md items-center">
          Total songs:
          {' '}
          {noOfTrack}
        </div>
        <div className="w-1/4 h-[15vh] bg-[#0b6b51] flex justify-center items-center rounded-md">
          Total Fans:
          {' '}
          {followers}
        </div>
        <div className="w-1/3 h-[15vh] bg-[#0b156b] flex justify-center items-center rounded-md">
          Total Hidden songs:
          {' '}
          {hidden}
        </div>
      </div>
      <div className="flex">
        <div>
          <ArtistCharts />
        </div>
        <div className="pt-4 ">
          <h1 className="ml-3 text-2xl font-extrabold">New Songs</h1>
          <div className="flex flex-wrap gap-2 px-2 overflow-auto">
            {songs.map((track) => (
              <ArtistSongCard
                song={track}
                key={track._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDashbord;
