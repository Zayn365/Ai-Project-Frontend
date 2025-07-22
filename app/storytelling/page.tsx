"use client";
import React from "react";
import dynamic from "next/dynamic";

const StoryBookPage = dynamic(() => import("@/components/pages/storybook"), {
  ssr: false,
});

export default function AiStoryPage() {
  return (
    <div>
      <StoryBookPage />
    </div>
  );
}
