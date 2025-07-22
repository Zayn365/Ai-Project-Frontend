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

export const formAiEbookSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  theme: z.array(
    z.enum([
      "Drama",
      "Thriller",
      "Tragic",
      "Adventure",
      "Comedy",
      "Horror",
      "Gore",
    ]),
    { required_error: "Please select at least one theme" }
  ),
  audience: z.array(z.enum(["Adults", "Teens", "Children"]), {
    required_error: "Please select at least one audience",
  }),
  level: z.enum(["Beginner", "Intermediate", "Professional"], {
    required_error: "Please select a skill level",
  }),
  size: z.enum(["256x256", "512x512", "1024x1024"], {
    required_error: "Please select an image size",
  }),
  noOfImagesL: z.any().optional(),
  imagesurl: z.object({
    url: z.array(z.string().url()).optional(),
  }),
});

export function AiEbookForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formAiEbookSchema>) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const formAi = useForm<z.infer<typeof formAiEbookSchema>>({
    resolver: zodResolver(formAiEbookSchema),
    defaultValues: {
      title: "",
      theme: [],
      audience: [],
      level: "Beginner",
      size: "256x256",
      // noOfImagesL: 1,
      imagesurl: {
        url: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1gaMRRUjOO72xhoR0E4gIU4wulCZLdHSM_A&s",
          "https://google.com",
        ],
      },
    },
  });

  const handleSubmit = async (values: z.infer<typeof formAiEbookSchema>) => {
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
        Create AI Ebook
      </CardHeader>
      <CardContent>
        <Form {...formAi}>
          <form
            onSubmit={formAi.handleSubmit(handleSubmit)}
            className="grid w-full gap-4"
          >
            <FormField
              control={formAi.control}
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
              control={formAi.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <div className="flex items-center flex-wrap gap-2">
                      {[
                        "Drama",
                        "Thriller",
                        "Tragic",
                        "Adventure",
                        "Comedy",
                        "Horror",
                        "Gore",
                      ].map((option: any) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            checked={field.value.includes(option)}
                            onChange={() => {
                              const newValue = field.value.includes(option)
                                ? field.value.filter((item) => item !== option)
                                : [...field.value, option];
                              field.onChange(newValue);
                            }}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formAi.control}
              name="audience"
              render={({ field }) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Audience</FormLabel>
                  <FormControl>
                    <div className="flex items-center flex-wrap gap-2">
                      {["Adults", "Teens", "Children"].map((option: any) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            checked={field.value.includes(option)}
                            onChange={() => {
                              const newValue = field.value.includes(option)
                                ? field.value.filter((item) => item !== option)
                                : [...field.value, option];
                              field.onChange(newValue);
                            }}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Add skill level select */}
            <FormField
              control={formAi.control}
              name="level"
              render={({ field }) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Skill Level</FormLabel>
                  <FormControl>
                    <div className="flex items-center flex-wrap gap-2">
                      {["Beginner", "Intermediate", "Professional"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              value={option}
                              // @ts-ignore
                              checked={field.value === option}
                              onChange={() => field.onChange(option)}
                            />
                            <span>{option}</span>
                          </label>
                        )
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Size Field */}
            <FormField
              control={formAi.control}
              name="size"
              render={({ field }) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Image Size</FormLabel>
                  <FormControl>
                    <select
                      className="border border-[#292524] bg-[#121212] rounded px-4 py-2 w-full"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="" disabled>
                        Select image size
                      </option>
                      {["256x256", "512x512", "1024x1024"].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Images */}
            {/* <FormField
              control={formAi.control}
              name="noOfImagesL"
              render={({ field }) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Number of Images</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      type="number"
                      placeholder="Enter the number of images"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Images URL */}
            {/* <FormField
              control={formAi.control}
              name="imagesurl.url"
              render={({ field }: any) => (
                <FormItem className="fade-out-5">
                  <FormLabel>Image URLs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter image URLs, one per line"
                      value={field.value.join("\n")}
                      onChange={(e) =>
                        field.onChange(e.target.value.split("\n"))
                      }
                      className="w-full h-24 p-2 border rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
