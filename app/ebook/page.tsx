// app/ebook/page.tsx
"use client";
import { useState } from "react";
import { AiEbookForm } from "@/components/pages/sections/AiEbookForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ebookSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(255),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export default function AiEbookPage() {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof ebookSchema
  > | null>(null);

  async function handleSubmit(values: z.infer<typeof ebookSchema>) {
    console.log("AI eBook submitted: ", values);
    try {
      const res = await Axios.post("/ebook", values);
      console.log(res);
      setSubmittedData(values);
      success("Successfully Created");
    } catch (err) {
      console.log(err);
      fail("Submission failed");
    }
  }

  return (
    <section className="container pt-24">
      <AiEbookForm onSubmit={handleSubmit} />
      {submittedData && (
        <Card className="mt-8">
          <CardHeader className="text-primary text-2xl">
            Submitted eBook
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold">{submittedData.title}</h3>
            <p>{submittedData.content}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
