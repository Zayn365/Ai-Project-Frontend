import React, { useEffect } from "react";
import { useState } from "react";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCreateMusic } from "./hooks/MusicHooks";
import { MusicPlaylist } from "./sections/MusicPlaylist";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import CreateAiMusicModal from "./create-ai-music-modal";
import { Axios } from "@/utils/Axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/common/loader";

const musicSchema = z.object({
  genre: z.array(z.string()).min(1, "Select at least one genre"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function MusicPage() {
  const { user } = useAppContext();
  const { createMusic, loading, error } = useCreateMusic();

  const [openAI, setOpenAI] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof musicSchema
  > | null>(null);
  const [musicResponse, setMusicResponse] = useState<any>(null);
  const [allAiMusic, setAllAiMusic] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllAiMusic = async () => {
    try {
      const { data } = await Axios.get("/music");
      if (data.status === 200) {
        setAllAiMusic(data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  async function handleSubmit(values: z.infer<typeof musicSchema>) {
    const prompt = `${values.genre} - ${values.description}`;
    console.log("Submitting AI Music prompt:", prompt);

    try {
      const response = await createMusic(prompt);
      setMusicResponse(response);
      setSubmittedData(values);
      success("Successfully created AI Music!");
      getAllAiMusic();
      setOpenAI(false);
    } catch (err) {
      console.error(err);
      fail("Music generation failed");
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const { data } = await Axios.delete(`/music/${id}`, {
        data: { userId: user?.id },
      });
      if (data.status === 200) {
        toast.success(`Deleted successfully`);
        getAllAiMusic();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAiMusic();
  }, []);

  return (
    <section className="container pt-16 pb-4">
      <div className="flex justify-end mb-2 gap-4">
        <Button onClick={() => setOpenAI(!openAI)}>Create a Ai Music</Button>
      </div>

      {submittedData && musicResponse?.content?.length > 0 && (
        <Card className="mt-8">
          <CardHeader className="text-primary text-2xl">
            Generated Music
          </CardHeader>
          <CardContent>
            <div className="mt-10">
              <MusicPlaylist
                title={musicResponse.content[0].title}
                coverImage={musicResponse.content[0].image_url}
                tracks={musicResponse.content.map((track: any) => ({
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

      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">All Musics</h2>
          {allAiMusic.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {allAiMusic.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={`item-${index}`}
                  className="mb-4 border rounded-md"
                >
                  <AccordionHeader>
                    <AccordionTrigger className="flex justify-between items-center w-full p-4 transition-colors">
                      <h3 className="text-xl font-bold">
                        {item?.content[0].title}
                      </h3>
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent className="p-4">
                    <Card>
                      <CardHeader className="text-primary text-2xl">
                        <div className="flex justify-between items-center gap-4">
                          <p>{item?.content[0].title}</p>
                          <div className="flex items-center gap-2">
                            {Number(item?.user_id) === Number(user?.id) && (
                              <Trash2
                                color="#FF0000"
                                className="cursor-pointer"
                                onClick={() => handleDelete(item.id)}
                              />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <MusicPlaylist
                            title={item?.content[0].title}
                            coverImage={item.content[0].image_url}
                            tracks={item.content.map((track: any) => ({
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
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p>No music available.</p>
          )}
        </div>
      )}

      <CreateAiMusicModal
        open={openAI}
        onClose={() => setOpenAI(false)}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </section>
  );
}
