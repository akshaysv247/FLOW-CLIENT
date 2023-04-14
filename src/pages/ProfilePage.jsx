import React from 'react';
import Profile from '../components/Profile/Profile';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';

function ProfilePage() {
  return (
    <div className="w-full h-screen bg-[#0b0618] overflow-hidden">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex w-full">
        <div className="h-screen hidden sm:block">
          <Sidebar />
        </div>
        <div className="absolute sm:ml-[18%] container mt-2 w-full  sm:w-[80%] h-[79%]"><Profile /></div>
      </div>
    </div>
  );
}

export default ProfilePage;
