/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCatagory, deleteCategory } from '../../Api/adminApi';

function Category() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [del, setDel] = useState(false);

  const handleAddCategory = () => {
    navigate('/admin/add-category');
  };

  useEffect(() => {
    async function invoke() {
      const result = await getCatagory();
      if (result.success) {
        setCategory(result.category);
      } else {
        navigate('/admin/login');
      }
    }
    invoke();
  }, [del]);
  const deleteCategories = async (catId) => {
    console.log(catId, 'cat');
    const result = await deleteCategory(catId);
    console.log(result, 'deleteCategory');
    if (result.success) {
      toast.success(result.message);
      setDel(true);
    } else {
      toast.error(result.message);
    }
  };
  const editCategory = async (catId) => {
    console.log(catId, 'cat');
    navigate('/admin/edit-category', { state: { categoryId: catId } });
  };
  const columns = [
    { field: 'name', headerName: 'Category Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 320 },

    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div>
          {!params.row.status ? (
            <p className="text-green-500 py-1 px-3 font-bold">Active</p>
          ) : (
            <p className="text-red-600 py-1 px-3 font-bold">Inactive</p>
          )}
        </div>
      ),
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 170,
      editable: true,
      renderCell: (params) => (
        <div>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => {
              deleteCategories(params.row._id);
            }}
          >
            Delete
          </button>

          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              editCategory(params.row._id);
            }}
          >
            Edit
            {' '}
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="w-[95vw] h-screen rounded-md flex flex-col gap-2 px-8 py-4 text-white">
      <div className="w-full h-28 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Categories</h1>
        <ToastContainer />
        <button type="button" className="p-5 flex justify-center items-center bg-[#151568] rounded-lg hover:shadow-md hover:shadow-black" onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="h-510">
        <DataGrid
          sx={{ color: 'white' }}
          columns={columns}
          rows={category}
          pageSize={8}
          rowsPerPageOptions={[9]}
          getRowId={(categories) => categories._id}
        />
      </div>
    </div>
  );
}

export default Category;
