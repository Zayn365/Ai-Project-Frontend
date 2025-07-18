import PaymentSuccessPage from "@/components/pages/PaymentSuccess";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentSuccessPage />
      </Suspense>
    </div>
  );
}
