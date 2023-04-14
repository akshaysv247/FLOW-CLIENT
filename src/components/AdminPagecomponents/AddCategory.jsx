/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory } from '../../Api/adminApi';

function AddCategory() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handlePlaylist = async (data) => {
    const result = await addCategory(data);
    if (result.success) {
      toast.success(result.message);
      navigate('/admin/categories');
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div className="w-[95vw] h-screen rounded-md flex flex-col gap-2 px-8 py-4 text-white">
      <ToastContainer />
      <div className="w-full h-28 flex justify-between items-center">
        <h1 className="text-4xl font-semibold"> Add Categories</h1>
      </div>
      <div className="w-full flex justify-center">
        <form
          className="w-[50vw] h-fit p-5 border flex flex-col gap-2 rounded-md justify-center items-center"
          onSubmit={handleSubmit(handlePlaylist)}
        >
          <input
            type="text"
            className="w-full h-14 rounded-md bg-gray-500 px-2"
            placeholder="Category Name"
            {...register('name', { required: 'please fill this field' })}
          />
          { errors.name && <span>{errors.name.message}</span>}
          <textarea
            type="text"
            className="w-full h-20 rounded-md bg-gray-500 px-2"
            placeholder="Enter description ..."
            {...register('description', { required: 'please fill this field' })}
          />
          { errors.description && <span>{errors.description.message}</span>}
          <Button type="submit" variant="contained" sx={{ width: '10vw' }}>Save</Button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
