"use client";
import { useState } from "react";
import {
  AiEbookForm,
  formAiEbookSchema,
} from "@/components/pages/sections/AiEbookForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

type ebookSchema = {
  theme:
    | ["Drama", "Thriller", "Tragic", "Adventure", "Comedy", "Horror", "Gore"];
  title: String;
  content: String;
  audience: ["Adults", "Teens", "Children"];
  level: "Beginner" | "Intermediate" | "Professional";
};

export default function AiEbookPage() {
  const [submittedData, setSubmittedData] = useState<ebookSchema | null>(null);
  const [content, setContent] = useState<String>("");
  const [images, setImages] = useState<string[]>([]);
  async function handleSubmit(values: z.infer<typeof formAiEbookSchema>) {
    if ((values.audience.length && values.theme) === 0) {
      fail("Please Define All Values");
      return;
    }
    try {
      const res = await Axios.post("/ebook/ai", {
        prompt: {
          title: values.title,
          audience: `${values.audience.concat()}`,
          theme: `${values.theme.concat()}`,
          level: values.level.toLowerCase(),
        },
      });
      const image = await Axios.post("/images/ai", {
        userId: 1,
        imagedetails: {
          title: values.title,
          size: values.size,
          noOfImagesL: Number(values.noOfImagesL),
        },
        imagesurl: { url: values.imagesurl },
      });
      setImages(image?.data?.message?.imagesurl?.urls);
      setSubmittedData(values as any);
      setContent(res?.data?.message);
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
            <div className="flex flex-wrap justify-center gap-4">
              {images?.length > 0 &&
                images.map((item: any, key) => (
                  <Image
                    key={key}
                    className="rounded-md object-cover"
                    src={item.url}
                    alt={`${key}`}
                    width={300} // Default width
                    height={300} // Default height
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Responsive sizes
                  />
                ))}
            </div>
            <p>Theme: {submittedData.theme}</p>
            <p>Audience: {submittedData.audience}</p>
            <p>Difficulty: {submittedData.level}</p>
            <p>Ebook:</p>
            <p>{content ? content : "Sorry! Something went wrong"}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
