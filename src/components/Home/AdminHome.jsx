import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminCharts from '../Charts/AdminCharts';
import {
  artistDeatais, getAllHiddenSongs, getAllTracks, userDetails,
} from '../../Api/adminApi';

function AdminHome() {
  const [noOfTrack, setNoOfTrack] = useState(0);
  const [artists, setArtists] = useState(0);
  const [users, setUsers] = useState(0);
  const [hidden, setHidden] = useState(0);
  useEffect(() => {
    const invoke = async () => {
      const result = await getAllTracks();
      if (result.success) {
        setNoOfTrack(result.songs.length);
      }
    };
    invoke();
    const prevoke = async () => {
      const result = await artistDeatais();
      if (result.success) {
        setArtists(result.artists.length);
      }
    };
    const voke = async () => {
      const result = await userDetails();
      if (result.success) {
        setUsers(result.users.length);
      }
    };
    const ok = async () => {
      const result = await getAllHiddenSongs();
      console.log(result, 'ress');
      if (result.success) {
        setHidden(result.length);
      }
    };
    invoke();
    prevoke();
    voke();
    ok();
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] flex gap-2 bg-[#05051a] overflow-hidden">
      <div className=" w-fit h-fit p-3">
        <AdminSidebar />
      </div>
      <div className="text-white w-full h-[100vh] p-3">
        <div className="w-full h-[100vh]">
          <div className="w-full h-fit  flex flex-wrap gap-2 px-2 py-2 justify-center">
            <div className="w-1/5 h-[15vh] bg-[#460a6b] flex justify-center rounded-md items-center">
              Total songs:
              {' '}
              {noOfTrack}
            </div>
            <div className="w-1/4 h-[15vh] bg-[#0b156b] flex justify-center items-center rounded-md">
              Total Artists:
              {' '}
              {artists}
            </div>
            <div className="w-1/5 h-[15vh] bg-[#0b6b51] flex justify-center items-center rounded-md">
              Total Fans:
              {' '}
              {users}
            </div>
            <div className="w-1/4 h-[15vh] bg-[#0b156b] flex justify-center items-center rounded-md">
              Total Hidden songs:
              {' '}
              {hidden}
            </div>
          </div>
          <div>
            <AdminCharts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
