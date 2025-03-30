"use client";

import { useState } from "react";
import {
  AiVideoForm,
  formAiVideoSchema,
} from "@/components/pages/sections/AiVideoForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCreateVideo } from "./hooks/VideoHooks";
import { VideoPlaylist } from "./sections/VideoPlaylist"; // <-- import it

const schema = formAiVideoSchema;

export default function AiVideoPage() {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof schema
  > | null>(null);
  const { createVideo, loading, error, response } = useCreateVideo(); // ⬅ use response

  async function handleSubmit(values: z.infer<typeof schema>) {
    try {
      await createVideo(values);
      setSubmittedData(values);
      success("Video successfully generated!");
    } catch (err) {
      console.error(err);
      fail("Video generation failed");
    }
  }

  return (
    <section className="container pt-24 space-y-8">
      <AiVideoForm onSubmit={handleSubmit} loading={loading} />

      {submittedData && (
        <Card>
          <CardHeader className="text-primary text-2xl">
            Submitted Video
          </CardHeader>
          <CardContent>
            {response?.video_url && (
              <VideoPlaylist
                video={{
                  video_id: response.video_id,
                  video_url: response.video_url,
                  thumbnail_url: response.thumbnail_url,
                  prompt: response.prompt,
                  state: response.state,
                }}
              />
            )}
          </CardContent>
        </Card>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
  );
}
