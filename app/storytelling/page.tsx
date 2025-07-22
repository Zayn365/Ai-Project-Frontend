// app/story/page.tsx
"use client";
import { useState } from "react";
import { AiStoryForm } from "@/components/pages/sections/AiStoryForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dynamic from "next/dynamic";


const StoryBookPage = dynamic(() => import("@/components/pages/storybook"), {
  ssr: false,
});



export default function AiStoryPage() {
 

  return (
     <div>
      <StoryBookPage />
    </div>
    // <section className="container pt-16 pb-4">
    //   <AiStoryForm onSubmit={handleSubmit} />
    //   {submittedData && (
    //     <Card className="mt-8">
    //       <CardHeader className="text-primary text-2xl">
    //         Submitted Story
    //       </CardHeader>
    //       <CardContent>
    //         <h3 className="text-xl font-bold">{submittedData.title}</h3>
    //         <p>{submittedData.prompt}</p>
    //       </CardContent>
    //     </Card>
    //   )}
    // </section>
  );
}
