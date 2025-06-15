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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ebookFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export function EbookForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof ebookFormSchema>) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ebookFormSchema>>({
    resolver: zodResolver(ebookFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<any>) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <Card className="bg-muted/60 dark:bg-card" data-aos="fade-up">
      <CardHeader
        className="text-primary text-2xl"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Create Ebook
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid w-full gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the ebook title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }: any) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter content"
                      rows={15}
                      {...field}
                      // value={field.value.join("\n")}
                      // onChange={(e) =>
                      //   field.onChange(e.target.value.split("\n"))
                      // }
                      className="w-full p-2 border rounded resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="default"
              className="mt-4 !bg-[#ea580c] fade-out-5"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Ebook"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
