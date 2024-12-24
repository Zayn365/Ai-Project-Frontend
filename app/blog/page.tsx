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
  const [message, setMessage] = useState<any>(null);
  const [isAI, setIsAi] = useState<boolean>(false);

  async function handleBlogSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await Axios.post("/blog", {
        title: values.title,
        content: values.body,
      });
      console.log("🚀 ~ handleBlogSubmit ~ res:", res);
      setSubmittedData(res.data?.message);
      success("Successfully Created");
    } catch (err: any) {
      fail(err.message || "An error occurred while creating the blog.");
      console.error(err);
    }
  }

  async function handleAiBlogSubmit(values: z.infer<typeof formAiSchema>) {
    try {
      const res = await Axios.post("/blog/ai", values);
      setMessage(res.data);
      success("Successfully Created");
    } catch (err: any) {
      aiError(err);
      console.error(err);
    }
  }

  return (
    <>
      {/* Toggle Buttons */}
      <section className="container pt-24 sm:pt-32">
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

      {/* Form Section */}
      <section className="container pt-t sm:pt-10">
        {isAI ? (
          <AiBlogForm onSubmit={handleAiBlogSubmit} />
        ) : (
          <BlogForm onSubmit={handleBlogSubmit} />
        )}
      </section>

      {/* Display Submitted Blog Data */}
      {(submittedData || message) && (
        <section className="container pt-5 sm:pt-15">
          <Card className="bg-muted/60 dark:bg-card mt-8">
            <CardHeader className="text-primary text-2xl">
              Submitted Blog
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-2">
                {isAI ? "AI Blog Results" : submittedData?.title}
              </h3>
              <p>{isAI ? message?.message : submittedData?.content}</p>
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
}
