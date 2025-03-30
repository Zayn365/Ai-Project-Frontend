"use client";
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
    <>
      <style>{`
        .playlist-container {
          display: flex;
          flex-direction: column;
          border: 1px solid #ccc;
          border-radius: 12px;
          overflow: hidden;
          background: var(--background-color, #fff);
          color: var(--text-color, #000);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .playlist-sidebar {
          padding: 1rem;
          background: linear-gradient(to bottom, #f3f3f3, #fff);
        }

        .playlist-sidebar img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .playlist-content {
          padding: 1rem;
        }

        .track {
          padding-bottom: 1rem;
          border-bottom: 1px solid #ddd;
        }

        .track-title {
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .track-meta {
          font-size: 0.875rem;
          color: #666;
        }

        .track audio {
          width: 100%;
          margin-top: 0.5rem;
        }

        .lyrics-box {
          margin-top: 0.75rem;
          font-size: 0.875rem;
          background-color: #f1f1f1;
          padding: 0.75rem;
          border-radius: 6px;
          white-space: pre-wrap;
        }

        .genre-pill {
          margin-top: 0.5rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #28a745;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .playlist-container {
            flex-direction: row;
          }

          .playlist-sidebar {
            width: 35%;
            border-right: 1px solid #ddd;
          }

          .playlist-content {
            width: 65%;
            max-height: 80vh;
            overflow-y: auto;
          }

          .track audio {
            width: 250px;
          }

          .track-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="playlist-container">
        {/* Sidebar Info Section */}
        <div className="playlist-sidebar">
          <img src={coverImage} alt={title} />
          <h2>{title}</h2>
          <p>{description}</p>
          {tracks[0]?.genre && (
            <div className="genre-pill">Genre: {tracks[0].genre}</div>
          )}
        </div>

        {/* Track List */}
        <div className="playlist-content">
          {tracks.map((track) => (
            <div key={track.id} className="track">
              <div className="track-header">
                <div onClick={() => toggleLyrics(track.id)}>
                  <p className="track-title">{track.title}</p>
                  <p className="track-meta">{formatDuration(track.duration)}</p>
                </div>
                <audio controls src={track.audio_url} preload="metadata" />
              </div>

              {openLyrics === track.id && (
                <div className="lyrics-box">{track.lyrics}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
