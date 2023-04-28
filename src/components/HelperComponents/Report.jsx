/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { reportSong } from '../../Api/userApis';

function Report({ setReport, track, setMessage }) {
  const { id } = useSelector((state) => state.user);
  const [rep, setRep] = useState('');
  const [error, setError] = useState('');
  const handleForm = async (e) => {
    e.preventDefault();
    if (rep.length !== 0) {
      if (rep.length < 5) {
        setError('Your report is too short');
      } else {
        const result = await reportSong(id, track, rep);
        if (result.success) {
          setReport(false);
          setMessage(result.message);
        }
      }
    }
    setError('fill the field properly');
  };
  const handleClose = () => {
    setReport(false);
  };
  return (
    <div className="w-[20vw] h-[20vh] absolute top-52 left-[50rem] bg-[#0f031cdd] flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-center text-lg font-bold pt-4 text-white">Do you want to report this song?</h1>
        <p onClick={handleClose} className="text-xl font-extrabold hover:cursor-pointer pl-3 text-white">X</p>
      </div>
      <form onSubmit={handleForm} className="flex flex-col w-full h-full items-center justify-center">
        <textarea type="text" className="outline-none rounded-md text-black" value={rep} onChange={((e) => setRep(e.target.value))} />
        {error && <span className="text-[red] text-sm">{error}</span>}
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}

export default Report;
