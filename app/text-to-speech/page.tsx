// pages/text-to-speech.tsx
import * as React from "react";
import TextToSpeechForm from "@/components/pages/sections/textToSpeech";

export default function TextToSpeechPage() {
  return (
    <div className="container mt-10 mx-auto p-4">
      <div
        className=" font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-[#ea580c] text-3xl via-gray-[#ea580c] to-[#d06c37]
            animate-text-color-change text-center
            "
      >
        Text To Speech
      </div>
      <section className="container pt-t sm:pt-10">
        <TextToSpeechForm />
      </section>
    </div>
  );
}
