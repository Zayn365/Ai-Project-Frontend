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
    <div className="flex flex-col lg:flex-row bg-white dark:bg-black text-black dark:text-white rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
      {/* Sidebar Info Section */}
      <div className="w-full lg:w-1/3 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-black p-4 sm:p-6">
        <img
          src={coverImage}
          alt={title}
          className="rounded-lg w-full object-cover mb-4"
        />
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
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
      <div className="w-full lg:w-2/3 p-4 sm:p-6 space-y-6 bg-white dark:bg-black">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex flex-col border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            {/* Title + Audio */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div
                className="cursor-pointer"
                onClick={() => toggleLyrics(track.id)}
              >
                <p className="text-lg sm:text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
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
                className="w-full sm:w-64 mt-2 sm:mt-0"
              />
            </div>

            {/* Lyrics */}
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
