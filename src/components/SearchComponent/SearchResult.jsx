/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';

function SearchResult({ result }) {
  return (
    <div className="absolute top-20 bg-[#790be056] w-[45vw] h-[45vh] flex items-center">
      {/* {result.map((item) => ( */}
      <div className="w-[40vw] h-[10vh] flex justify-center">
        {result}
      </div>
      {/* ))} */}
    </div>
  );
}

export default SearchResult;
