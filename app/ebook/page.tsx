"use client";
import { useState } from "react";
import { AiEbookForm } from "@/components/pages/sections/AiEbookForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ebookSchema = {
  theme:
    | ["Drama", "Thriller", "Tragic", "Adventure", "Comedy", "Horror", "Gore"];
  title: String;
  content: String;
  audience: ["Adults", "Teens", "Children"];
  difficulty: "Beginner" | "Intermediate" | "Professional";
};

const ebookSchemaSubmit = z.object({
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

export default function AiEbookPage() {
  const [submittedData, setSubmittedData] = useState<ebookSchema | null>(null);
  const [content, setContent] = useState<String>("");

  async function handleSubmit(values: z.infer<typeof ebookSchemaSubmit>) {
    try {
      const res = await Axios.post("/ebook/ai", {
        prompt: {
          title: values.title,
          audience: `${values.audience.concat()}`,
          theme: `${values.theme.concat()}`,
          level: values.level[0].toLowerCase(),
        },
      });
      setSubmittedData(values as any);
      setContent(res?.data?.message?.content);
      success("Successfully Created");
    } catch (err) {
      console.log(err);
      fail("Submission failed");
    }
  }

  return (
    <section className="container pt-24">
      <AiEbookForm onSubmit={handleSubmit} />
      {submittedData && content && (
        <Card className="mt-8">
          <CardHeader className="text-primary text-2xl">
            Submitted eBook
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold">{submittedData.title}</h3>
            <p>Theme: {submittedData.theme}</p>
            <p>Audience: {submittedData.audience}</p>
            <p>Difficulty: {submittedData.difficulty}</p>
            <p>Ebook:</p>
            <p>{content ? content : "Sorry! Something went wrong"}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
