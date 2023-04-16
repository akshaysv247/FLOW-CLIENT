/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Button } from '@mui/material';
import {
  ref, getDownloadURL, uploadBytesResumable,
} from 'firebase/storage';

import { storage } from '../../Config/firebase.config';
import ArtistHeader from '../Header/ArtistHeader';
import ArtistSidebar from '../Sidebar/ArtistSidebar';
import { getCategory, addTrack } from '../../Api/artistApi';
import Progress from '../HelperComponents/Progress';
import { LANG } from '../../constants/lang';

function AddTrack() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [img, setImg] = useState();
  const [audio, setAudio] = useState('');
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState(LANG[0]);
  const [selectedCat, setSelectedCat] = useState('');
  const [uploadedImg, setUploadedImg] = useState('');
  const { name, id } = useSelector((state) => state.artist);
  const navigate = useNavigate();

  const handleAudioUpload = (e) => {
    setAudio(e.target.files[0]);
    setLoadingAudio(true);

    const audioref = ref(storage, `/audio/${e.target.files[0].name}`);
    const uploadtask = uploadBytesResumable(audioref, e.target.files[0]);

    uploadtask.on('state_changed', (snapshot) => {
      const progres = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progres);
    }, (error) => {
      console.log(error);
    }, () => {
      getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        setAudio(downloadURL);
      });
    });
  };

  const handleImgUpload = (e) => {
    setImg(e.target.files[0]);
    setLoading(true);
    try {
      if (img == null) { return; }
      const imageref = ref(storage, `/images/${img.name}`);
      console.log(imageref);
      const uploadtask = uploadBytesResumable(imageref, img);
      uploadtask.on(
        'state_changed',
        (snapshot) => {
          const progres = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // setProgresspercent(progress);
          console.log(progres);
          setProgress(progres);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setImg(downloadURL);
            setUploadedImg(downloadURL);
          });
        },
      );
    } catch (error) {
      toast.error('something went wrong');
    }
  };

  const upload = async (datas) => {
    console.log(datas, 'fgsdg', name);
    if (datas && img && audio) {
      try {
        const result = await addTrack(id, datas, img, audio, name, selectedCat, language);
        if (result.success) {
          console.log(result);
          navigate('/artist/track');
        } else {
          toast.error(result.message);
        }
        // });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    async function invoke() {
      const response = await getCategory();
      if (!response.success) {
        navigate('/artist/login');
      }
      setSelectedCat(response.category[0].name);
      setCategory(response?.category);
    }
    invoke();
  }, []);
  return (
    <div className="w-[100%] h-screen bg-[#050514] flex flex-col text-white">
      <div className="w-full h-20">
        <ArtistHeader />
      </div>
      <div className="w-full h-full flex">
        <div className="sm:h-[560px] ml-3">
          <ArtistSidebar />
        </div>
        <ToastContainer />
        <div className="flex flex-col items-center sm:w-[81%]  bg-transparent rounded-md p-5 m-1">
          <p className="text-2xl font-extrabold">ADD NEW SONG</p>
          <form className="w-[70%] gap-2 p-3 bg-[#080823]" onSubmit={handleSubmit(upload)}>
            <div className="flex flex-wrap w-full gap-3">
              <div className="w-[50%] p-2 flex flex-col items-center gap-2">
                <h1>SONG NAME</h1>
                <input
                  type="text"
                  className="w-full p-2 rounded-md text-black"
                  placeholder="Enter the song name here"
                  {...register('songName', {
                    required: 'Fill this field',
                    maxLength: { value: 20, message: 'Field can only contain 20 letters' },
                    minLength: { value: 4, message: 'Field should have atleast 4 characters' },
                  })}
                />
                {errors?.songName && <p className="text-red-600">{errors.songName.message}</p>}
                <h1>ALBUM NAME</h1>
                <input
                  type="text"
                  className="w-full p-2 rounded-md text-black"
                  placeholder="Enter the Album name here"
                  {...register('albumName', {
                    required: 'Fill this field',
                    maxLength: { value: 20, message: 'Field can not exceed 20 characters' },
                    minLength: { value: 4, message: 'Field should be atleast 4 characters' },
                  })}
                />
                {errors?.albumName && <p className="text-red-600">{errors.albumName.message}</p>}
                <h1>CATEGORY</h1>
                <select
                  className="bg-blue-500 w-52 flex justify-center items-center outline-none"
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                >
                  {Category?.map((category) => (
                    <option key={category?._id} value={category?.name}>{category?.name}</option>
                  ))}
                </select>
                <h1>LANGUAGE</h1>
                <select
                  className="bg-blue-500 w-52 flex justify-center items-center"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {LANG?.map((lan) => (
                    <option key={lan?._id} value={lan}>{lan}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 p-5 w-[48%] items-center">
                {uploadedImg ? <img src={uploadedImg} alt="songImg" className="w-44 object-cover object-center bg-cover bg-center" /> : (
                  <label className="w-[100%] h-40 bg-[#042a3b] flex flex-col justify-center items-center">
                    <p className="text-lg text-black text-center">
                      {!loading ? <CloudUploadIcon /> : <Progress value={progress} />}
                    </p>
                    <p className="text-black">Upload the Image file </p>
                    <div>
                      <input
                        type="file"
                        name="imgFile"
                        accept="image/*"
                        className="w-full h-7"
                        onChange={handleImgUpload}
                      />
                    </div>
                    {/* <Button variant="contained" onClick={handleImgUpload}>Upload</Button> */}
                  </label>
                )}
                <label className="w-[100%] h-40 bg-[#042a] flex flex-col justify-center items-center">
                  <p className="text-lg text-black text-center">
                    {!loadingAudio ? <CloudUploadIcon /> : <Progress value={progress} />}
                  </p>
                  <p className="text-black">Upload the Audio file </p>
                  <div>
                    <input
                      type="file"
                      name="audioFile"
                      accept="audio/*"
                      className="w-full h-7"
                      onChange={handleAudioUpload}
                    />
                  </div>
                  {/* <Button variant="contained" onClick={handleAudioUpload}>Upload</Button> */}
                </label>
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <button type="submit" className="bg-[blue] w-[30%] p-3 rounded-lg hover:bg-[red] hover:text-xl transition-colors ease-in-out">UPLOAD</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTrack;
