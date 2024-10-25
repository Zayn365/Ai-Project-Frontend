// app/music/page.tsx
"use client";
import { useState } from "react";
import { AiMusicForm } from "@/components/pages/sections/AiMusicForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const musicSchema = z.object({
  genre: z.string().min(2, "Genre must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function AiMusicPage() {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof musicSchema
  > | null>(null);

  async function handleSubmit(values: z.infer<typeof musicSchema>) {
    console.log("AI Music submitted: ", values);
    try {
      const res = await Axios.post("/music", values);
      console.log(res);
      setSubmittedData(values);
      success("Successfully Created");
    } catch (err) {
      console.log(err);
      fail("Submission failed");
    }
  }

  return (
    <section className="container pt-24">
      <AiMusicForm onSubmit={handleSubmit} />
      {submittedData && (
        <Card className="mt-8">
          <CardHeader className="text-primary text-2xl">
            Submitted Music
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold">Genre: {submittedData.genre}</h3>
            <p>{submittedData.description}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
