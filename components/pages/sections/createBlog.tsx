"use client";
import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(255),
  body: z.string().min(5, "Body must be at least 5 characters"),
});

export function BlogForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset from element for triggering animation
      easing: "ease-in-out", // Easing for smooth animation
      once: true, // Trigger animation only once
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="bg-muted/60 dark:bg-card"
      data-aos="fade-up" // Add animation for the card
    >
      <CardHeader
        className="text-primary text-2xl"
        data-aos="fade-down"
        data-aos-delay="200" // Delay for sequential animation
      >
        Create Blog
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid w-full gap-4"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem data-aos="fade-right" data-aos-delay="400">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Body Field */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem data-aos="fade-left" data-aos-delay="600">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the blog content" {...field} />
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
              data-aos-delay="800"
            >
              {isLoading ? "Submitting..." : "Submit Blog"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
