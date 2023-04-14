import React from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import Category from '../../components/AdminPagecomponents/Category';

function AdminCategoryPage() {
  return (
    <div className="flex w-full h-screen bg-[#050423] p-2 gap-2">
      <div>
        <AdminSidebar />
      </div>
      <div>
        <Category />
      </div>
    </div>
  );
}

export default AdminCategoryPage;
