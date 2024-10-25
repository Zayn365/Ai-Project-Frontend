// app/image/page.tsx
"use client";
import { useState } from "react";
import { AiImageForm } from "@/components/pages/sections/AiImageForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const imageSchema = z.object({
  prompt: z.string().min(10, "Description must be at least 10 characters"),
});

export default function AiImagePage() {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof imageSchema
  > | null>(null);

  async function handleSubmit(values: z.infer<typeof imageSchema>) {
    console.log("AI Image submitted: ", values);
    try {
      const res = await Axios.post("/image", values);
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
      <AiImageForm onSubmit={handleSubmit} />
      {submittedData && (
        <Card className="mt-8">
          <CardHeader className="text-primary text-2xl">
            Submitted Image
          </CardHeader>
          <CardContent>
            <p>{submittedData.prompt}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
