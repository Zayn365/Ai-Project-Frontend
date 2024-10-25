// components/AiStoryForm.tsx
"use client";
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
import { useState } from "react";

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
    <Card className="bg-muted/60 dark:bg-card">
      <CardHeader className="text-primary text-2xl">Create AI Story</CardHeader>
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
                <FormItem>
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
                <FormItem>
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
