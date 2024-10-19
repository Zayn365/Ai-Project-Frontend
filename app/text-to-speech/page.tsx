// pages/text-to-speech.tsx
import * as React from "react";
import TextToSpeechForm from "@/components/pages/sections/textToSpeech";

export default function TextToSpeechPage() {
  return (
    <div className="container mt-10 mx-auto p-4">
      <section className="container pt-t sm:pt-10">
        <TextToSpeechForm />
      </section>
    </div>
  );
}
