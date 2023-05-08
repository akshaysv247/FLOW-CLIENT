import React, { useEffect } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { getCopyrights } from '../../Api/adminApi';

function AdminCopyrights() {
  useEffect(() => {
    const invoke = async () => {
      const result = await getCopyrights();
      console.log(result);
    };
    invoke();
  }, []);
  return (
    <div className="flex w-full h-screen bg-[#050423] p-2 gap-2">
      <div>
        <AdminSidebar />
      </div>
      <div>
        b
      </div>
    </div>
  );
}

export default AdminCopyrights;
