import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllTracks, getHiddenSongsOfAnArtist, getFollowers } from '../../Api/artistApi';
import ArtistCharts from '../Charts/ArtistCharts';

function ArtistDashbord() {
  const { id } = useSelector((state) => state.artist);
  const [noOfTrack, setNoOfTrack] = useState(0);
  const [hidden, setHidden] = useState(0);
  const [followers, setFollowers] = useState(0);
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
    invoke();
    func();
    prevoke();
  }, []);
  return (
    <div className="w-full h-[100vh]">
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
      <div>
        <ArtistCharts />
      </div>
      <div>f</div>
    </div>
  );
}

export default ArtistDashbord;
