import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="container">
      <Card className="mt-8">
        <CardHeader className="text-primary text-2xl">
          Payment Cancelled!
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {" "}
            Your payment was cancelled. Please try again.
          </p>
          <Link
            href="/"
            className="bg-[#ea580c] text-white px-4 py-2 rounded mt-4 inline-block"
          >
            Return to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
