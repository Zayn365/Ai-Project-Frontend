import React, { useState } from "react";

interface Track {
  id: string;
  title: string;
  image_url: string;
  audio_url: string;
  duration: number;
  lyrics: string;
  genre: string;
}

interface MusicPlaylistProps {
  title: string;
  description: string;
  coverImage: string;
  tracks: Track[];
}

export const MusicPlaylist: React.FC<MusicPlaylistProps> = ({
  title,
  description,
  coverImage,
  tracks,
}) => {
  const [openLyrics, setOpenLyrics] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const toggleLyrics = (trackId: string) => {
    setOpenLyrics(openLyrics === trackId ? null : trackId);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-black text-black dark:text-white rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
      {/* Sidebar */}
      <div className="md:w-1/3 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-black p-6">
        <img
          src={coverImage}
          alt={title}
          className="rounded-lg w-full object-cover mb-4"
        />
        <h2 className="text-3xl font-bold mb-1">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {description}
        </p>
        {tracks[0]?.genre && (
          <p className="text-green-600 dark:text-green-400 font-medium uppercase text-xs">
            Genre: {tracks[0].genre}
          </p>
        )}
      </div>

      {/* Track List */}
      <div className="md:w-2/3 p-6 overflow-y-auto space-y-6 max-h-[80vh] bg-white dark:bg-black">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex flex-col border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
              <div
                className="cursor-pointer"
                onClick={() => toggleLyrics(track.id)}
              >
                <p className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {track.title}
                </p>
                <p className="text-gray-500 text-sm">
                  {formatDuration(track.duration)}
                </p>
              </div>
              <audio
                controls
                src={track.audio_url}
                preload="metadata"
                className="w-full md:w-64 mt-2 md:mt-0"
              />
            </div>

            {openLyrics === track.id && (
              <div className="mt-4 text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
                {track.lyrics}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
