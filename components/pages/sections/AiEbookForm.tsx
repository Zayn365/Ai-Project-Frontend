// components/AiEbookForm.tsx
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

// Update schema to include skillLevel
const formAiEbookSchema = z.object({
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
  level: z.array(z.enum(["Beginner", "Intermediate", "Professional"]), {
    required_error: "Please select a skill level",
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
      level: [], // Default value for the select
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
                        (option: any) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              value={option}
                              checked={field.value[0] === option} // Since it's now a single value, use the first element to compare
                              onChange={() => field.onChange([option])} // Wrap the selected value in an array
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
