import React, { useState } from 'react';

function LibraryBar() {
  const [playlist, setPlaylist] = useState(true);
  return (
    <div className="w-full h-10 px-2 py-1 flex gap-4">
      <button
        type="button"
        className={playlist ? 'bg-gray-600 px-2 py-1 rounded-m' : 'bg-transparent'}
        onClick={() => setPlaylist(true)}
      >
        Playlist
      </button>
      <button
        type="button"
        className={playlist ? 'bg-transparent' : 'bg-gray-600 px-2 py-1 rounded-m'}
        onClick={() => setPlaylist(false)}
      >
        Artists
      </button>
    </div>
  );
}

export default LibraryBar;
