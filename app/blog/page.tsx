// app/page.tsx
"use client";
import { useState } from "react";
import { BlogForm } from "@/components/pages/sections/createBlog";
import { AiBlogForm } from "@/components/pages/sections/createAiBlog";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Axios } from "@/utils/Axios";
import { success, fail, aiError } from "@/utils/ToastMessages";

// Define the schemas for the forms
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(255),
  body: z.string().min(5, "Body must be at least 5 characters"),
});

const formAiSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
});

export default function Page() {
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [aiData, setAiData] = useState<z.infer<typeof formAiSchema> | null>(
    null
  );
  const [message, setMessage] = useState<any>();
  const [isAI, setIsAi] = useState<boolean>(false);

  async function handleBlogSubmit(values: z.infer<typeof formSchema>) {
    console.log("Blog submitted: ", values);
    await Axios.post("/blog", { title: values.title, content: values.body })
      .then((res) => {
        console.log(res);
        setMessage(res.data);
        success("Successfully Created");
      })
      .catch((err) => {
        console.log(err);
        fail(err.message);
      });
  }

  console.log("🚀 ~ Page ~ message:", message);
  async function handleAiBlogSubmit(values: z.infer<typeof formAiSchema>) {
    console.log("AI Blog submitted: ", values);
    await Axios.post("/blog/ai", values)
      .then((res) => {
        console.log(res);
        setMessage(res.data);
        success("Successfully Created");
      })
      .catch((err) => {
        console.log(err);
        aiError(err);
        // fail(err.message);
      });
  }

  return (
    <>
      <section className="container pt-24 sm:pt-32">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={isAI ? "outline" : "default"}
            onClick={() => setIsAi(false)}
          >
            My Blog
          </Button>
          <Button
            variant={!isAI ? "outline" : "default"}
            onClick={() => setIsAi(true)}
          >
            AI Blog
          </Button>
        </div>
      </section>

      {isAI ? (
        <section className="container pt-t sm:pt-10">
          <AiBlogForm onSubmit={handleAiBlogSubmit} />
        </section>
      ) : (
        <section className="container pt-t sm:pt-10">
          <BlogForm onSubmit={handleBlogSubmit} />
        </section>
      )}

      {/* Section to display the submitted blog data */}
      <section className="container pt-5 sm:pt-15">
        {(submittedData || aiData) && (
          <Card className="bg-muted/60 dark:bg-card mt-8">
            <CardHeader className="text-primary text-2xl">
              Submitted Blog
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-2">
                {submittedData ? submittedData?.title : "Results:"}
              </h3>
              <p>{message ? message?.message : aiData?.prompt}</p>
            </CardContent>
          </Card>
        )}
      </section>
    </>
  );
}
