/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { artistBlock, verifyArtist, artistDeatais } from '../../Api/adminApi';
// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

function ArtistList() {
  const [artist, setArtist] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setalert] = useState(null);
  const [artistStatus, setArtistStatus] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    async function getArtist() {
      try {
        const result = await artistDeatais();
        if (result.status === 'failed') {
          navigate('admin/login');
        } else {
          setArtist(result.artists);
        }
      } catch (error) {
        setalert(error.message);
      }
    }
    getArtist();
  }, [artistStatus, navigate]);

  const artistBlocks = async (artistId) => {
    try {
      const response = await artistBlock(artistId);
      if (response.status === 'success') {
        console.log(response);
        setOpen(true);
        setalert(response.message);
        setArtistStatus(!artistStatus);
      }
    } catch (error) {
      console.log(error);
      setalert(error.message);
    }
  };
  const artistVerify = async (artistId) => {
    try {
      const response = await verifyArtist(artistId);
      console.log(response, 'sds');
      if (response.status === 'success') {
        console.log(response);
        setOpen(true);
        setalert(response.message);
        setArtistStatus(!artistStatus);
      }
    } catch (error) {
      console.log(error);
      setalert(error.message);
    }
  };
  const columns = [
    {
      field: 'ImgUrl',
      headerName: '---',
      width: 100,
      renderCell: (params) => <img src={params.row.ImgUrl} alt="img" />,
    },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 170 },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'number',
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: 'Joined Date',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 130,
    },
    {
      field: 'isBlocked',
      headerName: 'Status',
      width: 120,
      editable: true,
      renderCell: (params) => (
        <div>
          {!params.row.isBlocked ? (
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
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div>
          {!params.row.isBlocked ? (
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                artistBlocks(params.row._id);
              }}
            >
              Block
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => {
                artistBlocks(params.row._id);
              }}
            >
              Unblock
            </button>
          )}
        </div>
      ),
    },
    {
      field: 'isVerified',
      headerName: 'Verification',
      width: 130,
      editable: true,
      renderCell: (params) => (
        <div>
          {!params.row.isVerified ? (
            <p className="text-red-600 py-1 px-3 font-bold">Not Verified</p>
          ) : (
            <p className="text-green-500 py-1 px-3 font-bold">Verified</p>
          )}
        </div>
      ),
    },
    {
      field: 'Verify',
      headerName: 'Verify',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div>
          {!params.row.isVerified ? (
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => {
                artistVerify(params.row._id);
              }}
            >
              Verify
            </button>
          ) : (
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              type="button"
              onClick={() => {
                artistVerify(params.row._id);
              }}
            >
              UnVerify
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-[#02020df8] flex">
      <div className="m-3">
        <AdminSidebar />
      </div>
      <div className="w-full sm:w-full h-screen relative my-3 bg-[#0b0b2ee3] text-white">
        <div className="flex justify-between">
          <h1 className="text-3xl m-8 font-extrabold">ARTIST INFO</h1>
          <Link to="/admin/home">
            <p className="m-12">HOME</p>
          </Link>
        </div>
        <div className="w-full bg-gray-900 flex items-center p-3 m-3 border border-[#15157e] ">
          <div style={{ height: 400, width: '99.8%', backgroundColor: 'gray' }}>
            <DataGrid
              rows={artist}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              getRowId={(artists) => artists._id}
            />
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ArtistList;
