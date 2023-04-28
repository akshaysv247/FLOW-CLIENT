/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FollowArtist, UnfollowArtist, isFollowing } from '../../Api/userApis';
import noProfile from '../../Assets/Avatars/Profile.webp';

function ArtistCard({ artist, setToasting }) {
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const { id } = useSelector((state) => state.user);
  const handleFollow = async () => {
    console.log(id, artist._id, 'Ids');
    const result = await FollowArtist(id, artist._id);
    console.log(result);
    if (result.success) {
      console.log('success');
      setFollowing(true);
      setToasting(result.message);
    }
  };
  const handleUnFollow = async () => {
    const result = await UnfollowArtist(id, artist._id);
    console.log(result);
    if (result.success) {
      setFollowing(false);
      setToasting(result.message);
    }
  };
  useEffect(() => {
    const invoke = async () => {
      const result = await isFollowing(id, artist._id);
      if (result.success) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    };
    invoke();
  }, []);
  const handleClick = () => {
    navigate('/view-artist', { state: { Artist: artist._id } });
  };

  return (
    <div key={artist._id} className="w-52 h-72 bg-gradient-to-r from-[#29073d] to-[#0e030e] rounded-md hover:scale-105 flex flex-col items-center py-2 gap-2">
      <div onClick={handleClick} className="w-44 h-52 bg-[#431643] rounded relative">
        {artist ? <img src={artist?.ImgUrl} className="h-full object-cover object-center rounded" alt="img" /> : <img src={noProfile} alt="img" className="h-full object-cover object-center rounded" />}
      </div>
      <div>
        <h2 className="text-white font-bold text-sm text-center shadow-lg">{artist.name}</h2>
        {!following
          ? <Button onClick={handleFollow} fullWidth variant="contained" sx={{ backgroundColor: 'violet', color: '#0d0225', '&:hover': { backgroundColor: 'green', scale: '1.2' } }}>Follow</Button>
          : <Button onClick={handleUnFollow} fullWidth variant="contained" sx={{ backgroundColor: 'red', color: '#0d0225', '&:hover': { backgroundColor: 'violet', scale: '1.2' } }}>Unfollow</Button>}
      </div>
    </div>
  );
}

export default ArtistCard;
