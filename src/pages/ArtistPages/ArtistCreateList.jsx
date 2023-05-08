/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {
  ref, getDownloadURL, uploadBytesResumable,
} from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useLocation } from 'react-router-dom';
import PlaylistSongComponent from '../../components/SongComponents/PlaylistSongComponent';
import Progress from '../../components/HelperComponents/Progress';
import { storage } from '../../Config/firebase.config';
import ArtistHeader from '../../components/Header/ArtistHeader';
import ArtistSidebar from '../../components/Sidebar/ArtistSidebar';
import { getSongsForPlayist, updateMyPlaylist } from '../../Api/artistApi';

function ArtistCreateList() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.artist.name);
  const location = useLocation();
  const { playlist } = location.state;
  const { name, _id } = playlist;
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [title, setTitle] = useState(name);
  const [img, setImg] = useState('');
  const [image, setImage] = useState('');
  const [songs, setSongs] = useState([]);
  const [songId, setSongId] = useState(null);
  const [songsId, setSongsId] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const result = await getSongsForPlayist();
      if (result.success) {
        setSongs(result.songs);
      }
    };
    invoke();
  }, []);

  useEffect(() => {
    if (songId != null && !songsId.includes(songId)) {
      setSongsId([...songsId, songId]);
    }
  }, [songId]);

  const handleImgUpload = (e) => {
    setImg(e.target.files[0]);
    setLoading(true);
    try {
      console.log(img, 'image');
      if (img == null) { return; }
      const imageref = ref(storage, `/images/${img.name}`);
      console.log(imageref, 'imgref');
      const uploadtask = uploadBytesResumable(imageref, img);
      uploadtask.on(
        'state_changed',
        (snapshot) => {
          const progres = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progres, 'progress');
          setProgress(progres);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setImage(downloadURL);
            if (downloadURL) {
              setUploaded(true);
            }
          });
        },
      );
      console.log(uploadtask, 'task');
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePlaylist = async (e) => {
    e.preventDefault();
    if (uploaded) {
      const result = await updateMyPlaylist({ title, image, songsId }, _id);
      if (result.success) {
        navigate('/artist/create-playlist');
        console.log(result.message);
      }
    }
  };
  return (
    <div className="w-full h-screen flex flex-col bg-[#0f021ffd] text-white gap-1">
      <div>
        <ArtistHeader />
      </div>
      <div className="w-full flex gap-1">
        <div><ArtistSidebar /></div>
        <div className="flex flex-col w-full bg-[#13013e] rounded-md p-4 gap-2">
          <form
            className="w-full h-96 flex px-20 py-10 bg-gradient-to-r from-[#2d0583] to-black items-center justify-between"
            onSubmit={handlePlaylist}
          >
            <div className="flex justify-center items-center gap-4">
              {/* {image ? (<img src={image} alt="img" className="w-52 h-44 rounded" />)
                : ( */}
              <label className="w-52 h-44 border-dashed rounded flex flex-col justify-center items-center">
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
              </label>
              {/* )} */}
              <div>
                <input className="text-5xl text-white font-semibold outline-none bg-transparent" placeholder={title} onChange={(e) => setTitle(e.target.value)} />
                <p className="text-name">{userName}</p>
              </div>
            </div>
            <div>
              <Button type="submit" variant="contained">Save</Button>
            </div>
          </form>
          <div className="w-full h-96">
            <div className="w-full flex flex-col gap-2 overflow-auto">
              {
                songs.map((song) => (
                  <PlaylistSongComponent song={song} setSongId={setSongId} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistCreateList;
