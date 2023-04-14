import React from 'react';
import { Link } from 'react-router-dom';
import Artist from '../../Assets/Avatars/artist1.jpeg';
import Fan from '../../Assets/Avatars/fan1.webp';
import Logo from '../Logo/Logo2';
import './SignOps.css';

function SignOps() {
  return (
    <div className="grid grid-cols-2 max-h-screen max-w-screen relative bg-hero">
      <div className="absolute justify-center ml-[500px]">
        <Logo />
      </div>
      <div className="w-1/screen h-screen flex justify-center relative">
        <div className="w-full h-screen flex justify-center items-center">
          <img
            src={Artist}
            className="w-[250px] h-[250px] rounded-full flex  border-2 border-x-black p-2 "
            alt=""
          />
          <div className="absolute grid justify-center mt-[350px]">
            <div className="w-full flex justify-center  ">
              <h3 className="text-white text-3xl font-semibold">AS AN</h3>
            </div>
            <div className="flex justify-center pt-3">
              <Link to="/artist/signup">
                <button
                  className="h-8 w-20 bg-[#fd173d] text-white rounded-lg hover:bg-[#ce1acecd]"
                  type="button"
                >
                  Artist
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/screen h-screen flex justify-center relative">
        <div className="w-full h-full flex justify-center items-center ml-8">
          <img
            src={Fan}
            className="w-[250px] h-[250px] rounded-full flex  border-2 border-x-black p-2"
            alt=""
          />
          <div className="absolute grid justify-center mt-[350px]">
            <div className="w-full flex justify-center  ">
              <h3 className="text-white text-3xl font-semibold">AS A</h3>
            </div>
            <div className="flex justify-center pt-3">
              <Link to="/signup">
                <button
                  className="h-8 w-20 bg-[#fd173d] text-white rounded-lg hover:bg-[#ce1acecd]"
                  type="button"
                >
                  Fan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignOps;
