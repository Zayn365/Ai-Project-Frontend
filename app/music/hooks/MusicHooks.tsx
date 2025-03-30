import { useState } from "react";

export const useCreateMusic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const createMusic = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const payload = {
      action: "generate",
      prompt,
      model: "chirp-v4",
    };

    try {
      const res = await fetch("https://api.acedata.cloud/suno/audios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer b5827a2e56c44fd9bd4b6f68df8a6998`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(
          `API Error: ${res.status} - ${res.statusText} - ${errorBody}`
        );
      }

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

  return { createMusic, loading, error, response };
};
