"use client";
import React from "react";
import dynamic from "next/dynamic";

const BlogPage = dynamic(() => import("@/components/pages/blog"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <BlogPage />
    </div>
  );
}
