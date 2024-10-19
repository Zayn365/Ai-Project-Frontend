"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";

const textToSpeechSchema = z.object({
  text: z.string().min(5, "Text must be at least 5 characters"),
});

interface IAppProps {}

export default function App(props: IAppProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof textToSpeechSchema>>({
    resolver: zodResolver(textToSpeechSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleTextToSpeech = async (
    values: z.infer<typeof textToSpeechSchema>
  ) => {
    setIsLoading(true);
    try {
      // Simulate text-to-speech API call
      const utterance = new SpeechSynthesisUtterance(values.text);
      speechSynthesis.speak(utterance);
      await new Promise((resolve) => {
        utterance.onend = resolve;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-muted/60 dark:bg-card">
      <CardHeader className="text-primary text-2xl">Text to Speech</CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleTextToSpeech)}
            className="grid w-full gap-4"
          >
            {/* Text Field */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the text" {...field} />
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
              {isLoading ? "Converting..." : "Convert to Speech"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
