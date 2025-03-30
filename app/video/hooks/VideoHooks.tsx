import { useState } from "react";

interface CreateVideoPayload {
  description: string;
  start_image_url?: string;
  end_image_url?: string;
  enhancement?: boolean;
  loop?: boolean;
}

export const useCreateVideo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const createVideo = async ({
    description,
    start_image_url,
    end_image_url,
    enhancement,
    loop,
  }: CreateVideoPayload) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const video_id = Math.floor(100000 + Math.random() * 900000).toString();

    const payload: any = {
      action: "generate",
      video_id,
      prompt: `${description}`,
      enhancement,
      loop,
    };

    if (start_image_url) payload.start_image_url = start_image_url;
    if (end_image_url) payload.end_image_url = end_image_url;

    try {
      const res = await fetch("https://api.acedata.cloud/luma/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 6f04fad3749749b080a2f89dbde95bba",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createVideo, loading, error, response };
};
