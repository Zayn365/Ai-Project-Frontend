"use client";
import dynamic from "next/dynamic";

const MusicPage = dynamic(() => import("@/components/pages/music"), {
  ssr: false,
});

export default function AiMusicPage() {
  return (
    <div>
      <MusicPage />
    </div>
  );
}
