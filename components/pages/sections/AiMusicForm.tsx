"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GENRE_OPTIONS = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Electronic",
  "Jazz",
  "Classical",
  "Country",
  "R&B",
  "Indie",
  "Reggae",
  "Folk",
  "Lo-fi",
];

const formAiMusicSchema = z.object({
  genre: z.array(z.string()).min(1, "Select at least one genre"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export function AiMusicForm({
  onSubmit,
  loading,
}: {
  onSubmit: (values: z.infer<typeof formAiMusicSchema>) => Promise<void>;
  loading: Boolean;
}) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const formAi = useForm<z.infer<typeof formAiMusicSchema>>({
    resolver: zodResolver(formAiMusicSchema),
    defaultValues: {
      genre: [],
      description: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formAiMusicSchema>) => {
    await onSubmit(values);
  };

  const handleGenreSelect = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      const updated = [...selectedGenres, genre];
      setSelectedGenres(updated);
      formAi.setValue("genre", updated);
    }
  };

  const removeGenre = (genre: string) => {
    const updated = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updated);
    formAi.setValue("genre", updated);
  };

  return (
    <Card className="bg-muted/60 dark:bg-card" data-aos="fade-up">
      <CardHeader
        className="text-primary text-2xl"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Create AI Music
      </CardHeader>

      <CardContent>
        <Form {...formAi}>
          <form
            onSubmit={formAi.handleSubmit(handleSubmit)}
            className="grid w-full gap-4"
          >
            {/* Genre Dropdown */}
            <FormField
              control={formAi.control}
              name="genre"
              render={() => (
                <FormItem data-aos="fade-right" data-aos-delay="300">
                  <FormLabel>Genres</FormLabel>
                  <Select onValueChange={handleGenreSelect}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENRE_OPTIONS.map((genre) => (
                        <SelectItem
                          key={genre}
                          value={genre}
                          disabled={selectedGenres.includes(genre)}
                        >
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Genre Pills */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="rounded-full px-3 py-1 text-sm cursor-pointer hover:line-through"
                        onClick={() => removeGenre(genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={formAi.control}
              name="description"
              render={({ field }) => (
                <FormItem data-aos="fade-left" data-aos-delay="400">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a description for the music"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="default"
              className="mt-4 !bg-[#ea580c]"
              disabled={loading as boolean}
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              {loading ? "Submitting..." : "Create Music"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}
