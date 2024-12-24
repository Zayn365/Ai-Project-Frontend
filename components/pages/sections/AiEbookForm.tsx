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
  noOfImagesL: z.number().optional(),
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
      noOfImagesL: 1,
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

  return (
    <Card className="bg-muted/60 dark:bg-card">
      <CardHeader className="text-primary text-2xl">Create AI Ebook</CardHeader>
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
                <FormItem>
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
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
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
                <FormItem>
                  <FormLabel>Audience</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
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
                <FormItem>
                  <FormLabel>Skill Level</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
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
                <FormItem>
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

            {/* Number of Images
            <FormField
              control={formAi.control}
              name="noOfImagesL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Images</FormLabel>
                  <FormControl>
                    <Input
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
            <FormField
              control={formAi.control}
              name="imagesurl.url"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Image URLs</FormLabel>
                  <FormControl>
                    <textarea
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
            />

            <Button
              type="submit"
              variant="default"
              className="mt-4 !bg-[#ea580c]"
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
