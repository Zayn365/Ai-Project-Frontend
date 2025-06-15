"use client";
import React from "react";
import dynamic from "next/dynamic";

const EbookPage = dynamic(() => import("@/components/pages/ebook"), {
  ssr: false,
});

export default function AiEbookPage() {
  return (
    <div>
      <EbookPage />
    </div>
  );
}
