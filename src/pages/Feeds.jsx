/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import SongComponent from '../components/SongComponents/SongComponent';
import { getFeeds } from '../Api/userApis';

function Feeds() {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const result = await getFeeds();
      if (result.success) {
      setFeeds(result);
      }
    };
    invoke();
  }, []);
  return (
    <div className="w-screen h-screen bg-[#0b0618] text-white flex flex-col gap-1">
      <div>
        <Header />
      </div>
      <div className="flex gap-2">
        <div><Sidebar /></div>
        <div className="p-3 flex flex-col gap-1">
          <div className="bg-gradient-to-r from-[#7d1aa1] w-[90vw] h-28 flex items-center px-2 rounded-md">
            <h1 className="text-3xl font-semibold">FEEDS</h1>
          </div>
          <div className="w-full h-96 rounded-md p-3 flex flex-col gap-2 overflow-auto">
            {feeds.length !== 0 ? feeds.map((feed) => (
              <SongComponent song={feed} />
            )) : <p className="text-3xl animate-bounce text-center text-purple-300">There is no feeds yet today</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feeds;
