"use client";
import React from "react";

interface VideoData {
  video_id: string;
  video_url: string;
  thumbnail_url: string;
  prompt: string;
  state: string;
}

interface VideoPlaylistProps {
  video: VideoData;
}

export const VideoPlaylist: React.FC<VideoPlaylistProps> = ({ video }) => {
  return (
    <div className="flex flex-col lg:flex-row bg-white dark:bg-black text-black dark:text-white rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Main Video Section */}
      <div className="w-full lg:w-2/3 p-4">
        <div className="rounded-lg overflow-hidden aspect-video bg-black mb-4">
          <video
            controls
            src={video.video_url}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-2 break-words">
          {video.prompt}
        </h2>
      </div>

      {/* Sidebar Thumbnails Section */}
      <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 p-4 space-y-4 max-h-[600px] overflow-y-auto">
        {[...Array(1)].map((_, idx) => (
          <div
            key={idx}
            className="flex gap-3 items-start hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded transition"
          >
            <div className="w-24 h-14 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
              <img
                src={video.thumbnail_url}
                alt="thumbnail"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium line-clamp-2 break-words">
                {video.prompt}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Luma AI · {video.state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
