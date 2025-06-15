import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="flex items-center gap-4 text-[#ea580c]">
        <LoaderCircle className="animate-spin" />
        Loading...
      </div>
    </div>
  );
}
