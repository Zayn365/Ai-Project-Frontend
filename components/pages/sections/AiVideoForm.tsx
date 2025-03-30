"use client";

import { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const formAiVideoSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  enhancement: z.boolean().default(false),
  loop: z.boolean().default(false),
  start_image_url: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .optional(),
  end_image_url: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .optional(),
});

export function AiVideoForm({
  onSubmit,
  loading,
}: {
  onSubmit: (values: z.infer<typeof formAiVideoSchema>) => Promise<void>;
  loading: boolean;
}) {
  const formAi = useForm<z.infer<typeof formAiVideoSchema>>({
    resolver: zodResolver(formAiVideoSchema),
    defaultValues: {
      description: "",
      enhancement: false,
      loop: false,
      start_image_url: "",
      end_image_url: "",
    },
  });

  useEffect(() => {
    formAi.clearErrors(); // optional reset on mount
  }, []);

  const handleSubmit = async (values: z.infer<typeof formAiVideoSchema>) => {
    await onSubmit(values);
  };

  return (
    <Card className="bg-muted/60 dark:bg-card">
      <CardHeader className="text-primary text-2xl">Create AI Video</CardHeader>
      <CardContent>
        <Form {...formAi}>
          <form
            onSubmit={formAi.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            {/* Description */}
            <FormField
              control={formAi.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe what the video should be about"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start/End Image URLs */}
            <FormField
              control={formAi.control}
              name="start_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/start.jpg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={formAi.control}
              name="end_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/end.jpg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Enhancement */}
            <FormField
              control={formAi.control}
              name="enhancement"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </FormControl>
                  <FormLabel className="m-0">Enhancement</FormLabel>
                </FormItem>
              )}
            />

            {/* Loop */}
            <FormField
              control={formAi.control}
              name="loop"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </FormControl>
                  <FormLabel className="m-0">Loop Video</FormLabel>
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="mt-4 !bg-[#ea580c]"
              disabled={loading}
            >
              {loading ? "Generating..." : "Create Video"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
