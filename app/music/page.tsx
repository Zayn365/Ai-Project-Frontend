"use client";
import { useState } from "react";
import { AiMusicForm } from "@/components/pages/sections/AiMusicForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCreateMusic } from "./hooks/MusicHooks";
import { MusicPlaylist } from "./sections/MusicPlaylist";

// Updated schema with 'style'
const musicSchema = z.object({
  genre: z.array(z.string()).min(1, "Select at least one genre"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function AiMusicPage() {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof musicSchema
  > | null>(null);
  const [musicResponse, setMusicResponse] = useState<any>(null); // Holds the full response from the API
  const { createMusic, loading, error } = useCreateMusic();

  async function handleSubmit(values: z.infer<typeof musicSchema>) {
    const prompt = `${values.genre} - ${values.description}`;
    console.log("Submitting AI Music prompt:", prompt);

    try {
      const response = await createMusic(prompt); // capture returned response
      setMusicResponse(response);
      setSubmittedData(values);
      success("Successfully created AI Music!");
    } catch (err) {
      console.error(err);
      fail("Music generation failed");
    }
  }

  return (
    <section className="container pt-24">
      <AiMusicForm onSubmit={handleSubmit} loading={loading} />

      {submittedData && musicResponse?.data?.length > 0 && (
        <Card className="mt-8">
          <CardHeader className="text-primary text-2xl">
            Generated Music
          </CardHeader>
          <CardContent>
            <div className="mt-10">
              <MusicPlaylist
                title="Fierce Femmes"
                description="Here's your new music cheat sheet from all the fierce femmes rockin’ your world right now."
                coverImage={musicResponse.data[0].image_url}
                tracks={musicResponse.data.map((track: any) => ({
                  id: track.id,
                  title: track.title,
                  image_url: track.image_url,
                  audio_url: track.audio_url,
                  duration: track.duration,
                  lyrics: track.lyric,
                  genre: track.style,
                }))}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
  );
}
