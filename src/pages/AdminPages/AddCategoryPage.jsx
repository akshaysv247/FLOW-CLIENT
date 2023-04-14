import React from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import AddCategory from '../../components/AdminPagecomponents/AddCategory';

function AddCategoryPage() {
  return (
    <div className="w-screen h-screen bg-[#050423] text-white p-2 flex gap-2">
      <div>
        <AdminSidebar />
      </div>
      <div>
        <AddCategory />
      </div>
    </div>
  );
}

export default AddCategoryPage;
