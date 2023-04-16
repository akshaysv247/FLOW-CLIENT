/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  ref, getDownloadURL, uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../Config/firebase.config';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { LANG } from '../../constants/lang';
import { getCatagory, addNewTrack } from '../../Api/adminApi';

function AdminAddTrack() {
  const { register, errors, handleSubmit } = useForm();
  const [img, setImg] = useState();
  const [audio, setAudio] = useState('');
  const navigate = useNavigate();
  const [language, setLanguage] = useState(LANG[0]);
  const [Category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');

  useEffect(() => {
    async function invoke() {
      const response = await getCatagory();
      if (!response.success) {
        navigate('/artist/login');
      }
      setSelectedCat(response.category[0].name);
      setCategory(response?.category);
    }
    invoke();
  }, []);

  const onSubmit = async (data) => {
    if (data && img && audio) {
      try {
        const result = await addNewTrack(data, img, audio, selectedCat, language);
        if (result.success) {
          console.log('result', result);
          navigate('/admin/tracks');
        }
        toast.error(result.message);
        toast.error('somethin went wrong');
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(errors);
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  };
  const handleImgUpload = () => {
    if (img == null) { return; }
    const imageref = ref(storage, `/images/${img.name}`);
    console.log(imageref);
    const uploadtask = uploadBytesResumable(imageref, img);
    uploadtask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgresspercent(progress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImg(downloadURL);
        });
      },
    );
  };
  const handleAudioUpload = () => {
    if (audio == null) { return; }
    const audioref = ref(storage, `/audio/${audio.name}`);
    console.log(audioref);
    const uploadtask = uploadBytesResumable(audioref, audio);
    uploadtask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setAudio(downloadURL);
        });
      },
    );
  };
  return (
    <div className="w-screen h-screen bg-black flex ">
      <div className="m-3">
        <AdminSidebar />
      </div>
      <ToastContainer />
      <div className="w-full my-3 bg-[#0b0b2ee3] text-white">
        <div className="flex justify-between">
          <h1 className="text-3xl m-8 font-extrabold">SONGS</h1>
          <Link to="/admin/home">
            <p className="m-12">HOME</p>
          </Link>
        </div>
        <div className="grid">
          <div className="w-[98%] flex p-3 m-3 border border-[#15157e] h-96 overflow-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="grid w-full">
              <div className="flex w-full">
                <div className="grid w-1/2">
                  <label>Song name</label>
                  <input
                    className="w-96 text-black h-10"
                    type="text"
                    placeholder="enter song name"
                    {...register('songName', { required: true, maxLength: 15 })}
                  />
                  <label>Artist name</label>
                  <input
                    className="w-96 text-black h-10"
                    placeholder="enter artist name"
                    type="text"
                    {...register('artistName', { required: true, maxLength: 15 })}
                  />
                  <label>Language</label>
                  <select
                    className="bg-blue-500 w-52 flex justify-center items-center"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {LANG?.map((lan) => (
                      <option key={lan?._id} value={lan}>{lan}</option>
                    ))}
                  </select>
                  <label>Category</label>
                  <select
                    className="bg-blue-500 w-52 flex justify-center items-center"
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                  >
                    {Category?.map((category) => (
                      <option key={category?._id} value={category?.name}>{category?.name}</option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2 grid bg-white h-full">
                  <div className="h-1/2 grid items-center">
                    <label className="border border-[#15157e] flex items-center justify-center h-44">
                      <div className="grid items-center justify-center">
                        <p className="text-lg text-black text-center">
                          <CloudUploadIcon />
                        </p>
                        <p className="text-black">Upload the Image file </p>
                      </div>
                      <div>
                        <input
                          type="file"
                          name="imgFile"
                          accept="image/*"
                          className="w-0 h-0"
                        // value={img}
                          onChange={handleFile}
                        />
                      </div>
                    </label>
                    <Button onClick={handleImgUpload}>Download</Button>
                  </div>
                  <div className="h-1/2 grid items-center">
                    <label className="flex items-center justify-center">
                      <div className="grid items-center justify-center">
                        <p className="text-lg text-black text-center">
                          <CloudUploadIcon />
                        </p>
                        <p className="text-black">Upload the Audio file </p>
                      </div>
                      <div>
                        <input
                          type="file"
                          name="audioFile"
                          accept="audio/*"
                          className="w-0 h-0"
                        // value={audio}
                          onChange={(e) => setAudio(e.target.files[0])}
                        />
                      </div>
                    </label>
                    <Button onClick={handleAudioUpload}>Download</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full">
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddTrack;
