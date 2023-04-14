import React from 'react';
import AdminSidebar from '../Sidebar/AdminSidebar';
// import Player from '../Player/Player';

function AdminHome() {
  return (
    <div className="w-screen h-screen grid grid-cols-2 relative bg-[#05051a] overflow-hidden">
      <div className=" w-full h-full p-3 absolute hidden sm:block">
        <AdminSidebar />
      </div>
      <div className="absolute mt-24 sm:mt-28 m sm:ml-72 w-full h-full">hii</div>
      {/* <div className="flex items-end w-screen my-2 mx-3 mr-3">
        <Player />
      </div> */}
    </div>
  );
}

export default AdminHome;
