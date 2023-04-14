import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../Sidebar/AdminSidebar';
import { getExactCategory, editCategory } from '../../../Api/adminApi';

function EditCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = location.state;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [discErr, setDiscErr] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    const invoke = async () => {
      const result = await getExactCategory(categoryId);
      if (result.success) {
        setName(result.exactCategory.name);
        setDescription(result.exactCategory.description);
      }
    };
    invoke();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const invoke = async () => {
      const result = await editCategory(categoryId, name, description);
      if (result.success) {
        navigate('/admin/categories');
      }
    };
    if (name && description) {
      if (name.length >= 3) {
        if (description.length > 15) {
          invoke();
        } else {
          setDiscErr('Description field should be at least 15 characters');
        }
      } else {
        setNameErr('Name field should be at least 3 characters');
      }
    } else {
      setErr('fill all the fields before submitting');
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex bg-[#02020df8] ">
      <div className="m-3">
        <AdminSidebar />
      </div>
      <div className="w-[95vw] h-screen rounded-md flex flex-col gap-2 px-8 py-4 text-white bg-[#0b0b31]">
        <div className="w-full h-28 flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-center"> Edit Categories</h1>
        </div>
        <div className="w-full flex justify-center">
          <form
            className="w-[50vw] h-fit p-5 border flex flex-col gap-2 rounded-md justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="w-full h-14 rounded-md bg-gray-500 px-2"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameErr && <span className="text-red-700 text-sm">{nameErr}</span>}
            <textarea
              type="text"
              className="w-full h-20 rounded-md bg-gray-500 px-2"
              placeholder="Enter description ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {discErr && <span className="text-red-700 text-sm">{discErr}</span>}
            {err && <span className="text-red-700 text-sm">{err}</span>}
            <Button type="submit" variant="contained" sx={{ width: '10vw' }}>Save</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
