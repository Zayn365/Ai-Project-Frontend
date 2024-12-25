"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formAiStorySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
});

export function AiStoryForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formAiStorySchema>) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const formAi = useForm<z.infer<typeof formAiStorySchema>>({
    resolver: zodResolver(formAiStorySchema),
    defaultValues: {
      title: "",
      prompt: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formAiStorySchema>) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-muted/60 dark:bg-card" data-aos="fade-up">
      <CardHeader
        className="text-primary text-2xl"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Create AI Story
      </CardHeader>
      <CardContent>
        <Form {...formAi}>
          <form
            onSubmit={formAi.handleSubmit(handleSubmit)}
            className="grid w-full gap-4"
          >
            {/* Title Field */}
            <FormField
              control={formAi.control}
              name="title"
              render={({ field }) => (
                <FormItem data-aos="fade-right" data-aos-delay="300">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the story title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prompt Field */}
            <FormField
              control={formAi.control}
              name="prompt"
              render={({ field }) => (
                <FormItem data-aos="fade-left" data-aos-delay="400">
                  <FormLabel>Story Prompt</FormLabel>
                  <FormControl>
                    <Input
                      type="textarea"
                      placeholder="Enter the story prompt"
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
              disabled={isLoading}
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              {isLoading ? "Submitting..." : "Create Story"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
