// components/AiImageForm.tsx
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

const formAiImageSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
});

export function AiImageForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formAiImageSchema>) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const formAi = useForm<z.infer<typeof formAiImageSchema>>({
    resolver: zodResolver(formAiImageSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formAiImageSchema>) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-muted/60 dark:bg-card">
      <CardHeader className="text-primary text-2xl">Create AI Image</CardHeader>
      <CardContent>
        <Form {...formAi}>
          <form
            onSubmit={formAi.handleSubmit(handleSubmit)}
            className="grid w-full gap-4"
          >
            <FormField
              control={formAi.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Prompt</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the image prompt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              className="mt-4 !bg-[#ea580c]"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Image"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
