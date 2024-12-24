// app/story/page.tsx
"use client";
import { useState } from "react";
import { AiStoryForm } from "@/components/pages/sections/AiStoryForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const storySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  prompt: z.string().min(10, "Plot must be at least 10 characters"),
});

export default function AiStoryPage() {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof storySchema
  > | null>(null);

  async function handleSubmit(values: z.infer<typeof storySchema>) {
    console.log("AI Story submitted: ", values);
    try {
      const res = await Axios.post("/story", values);
      setSubmittedData(values);
      success("Successfully Created");
    } catch (err) {
      console.log(err);
      fail("Submission failed");
    }
  }

  return (
    <section className="container pt-24">
      <AiStoryForm onSubmit={handleSubmit} />
      {submittedData && (
        <Card className="mt-8">
          <CardHeader className="text-primary text-2xl">
            Submitted Story
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold">{submittedData.title}</h3>
            <p>{submittedData.prompt}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
