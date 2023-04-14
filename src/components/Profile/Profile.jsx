/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { storage } from '../../Config/firebase.config';
import { getProfile, updateProfile, uploadPicture } from '../../Api/userApis';
import Progress from '../HelperComponents/Progress';
import { userActions } from '../../Redux/Slice/UserSlice';

function Profile() {
  const [visible, setVisible] = useState(false);
  const [editPic, setEditPic] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id, ImgURL } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function invoke() {
      const result = await getProfile(id);
      console.log(result);
      if (!result.success) {
        navigate('/');
      } else {
        setUser(result.profile);
        setUploadedUrl(ImgURL);
        setName(result.profile.name);
        setEmail(result.profile.email);
      }
    }
    invoke();
  }, []);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleEditProfile = async (data) => {
    data.preventDefault();
    const change = {
      name, email,
    };
    console.log(change, 'change');
    if (data) {
      const result = await updateProfile(id, change);
      if (result) {
        console.log(result, 'dddf');
        setName(result.name);
        setEmail(result.email);
      }
    }
  };

  const handleProPic = () => {
    setEditPic(!editPic);
    setVisible(!visible);
  };

  const handleProfilePic = async () => {
    setLoading(true);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profile/${imageUpload.name}`);
    const uploadImage = uploadBytesResumable(imageRef, imageUpload);
    console.log(uploadImage);
    uploadImage.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgresspercent(progress);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          setUploadedUrl(downloadURL);
        });
        async function upload(uri) {
          const picture = await uploadPicture(uri, id);
          if (picture) {
            // toast.success(picture.message);
            dispatch(userActions.setUserImg(uploadedUrl));
          }
        }
        upload(uploadedUrl);
      },
    );
  };

  return (
    <div className="w-full h-full bg-transparent grid justify-center">
      <div className="mt-5 flex flex-col justify-center ">
        <div className="w-full h-full mt-3 flex flex-col justify-center">
          <div className="w-full flex justify-center">
            {loading && <Progress value={progress} />}
            <div className="mt-2 flex items-center" onClick={() => setVisible(true)}>
              {!uploadedUrl && (
                <span className="inline-block h-32 w-32 overflow-hidden rounded-full bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}

              {uploadedUrl && <img src={uploadedUrl} alt="profile" className="w-32 h-32 rounded-full bg-center bg-cover object-center object-cover" />}
            </div>
          </div>
          {visible && <Button variant="contained" onClick={handleProPic}>Edit Picture</Button>}
          {editPic && (
            <div className="bg-purple-700 border px-2 py-2 flex flex-col justify-center">
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
                accept="image/*"
                className="h-10 rounded-md border border-gray-300 bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
              />
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  sx={{ width: '50px', display: 'flex', justifyContent: 'center' }}
                  onClick={handleProfilePic}
                >
                  Update
                </Button>
              </div>
            </div>
          )}
          <h1 className="text-3xl font-semibold text-white text-center">
            {user.name}
          </h1>
          <p className="text-white text-center">
            PH:
            {user.phone}
          </p>
        </div>
        <hr />
      </div>
      { edit && (
      <div className="container w-full">
        <form onSubmit={handleEditProfile}>
          <div>
            <h1 className="text-white text-center">User Name</h1>
            <input
              type="text"
              placeholder="UserName"
              className="w-full rounded-md h-8 bg-[#e8e4ed] text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h1 className="text-white text-center">Email Address</h1>
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-full rounded-md h-8 bg-[#efe8f5] text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center mt-4">
            <button className="h-10 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-md" type="submit">Submit</button>
          </div>
        </form>
      </div>
      )}
      <div className="flex w-full gap-2 justify-center">
        <button className="h-10 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-md" type="button">
          <ExitToAppIcon />
          Log out
        </button>
        <button
          className="h-10 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-md"
          type="button"
          onClick={handleEdit}
        >
          {edit ? 'save' : 'Edit Profile' }
        </button>
      </div>
    </div>
  );
}

export default Profile;
