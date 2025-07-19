"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import useUrl from "@/hooks/useUrl";
import { Axios } from "@/utils/Axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function PaymentSuccessPage() {
  const { query } = useUrl();
  const router = useRouter();
  const { setUser } = useAppContext();
  const hasVerifiedRef = useRef(false);

  const verifyPayment = async () => {
    try {
      const payload = {
        id: query?.id,
        email: query?.email,
        plan: query?.title,
        subscription: query?.title,
        credits: query?.quan,
      };
      const { data } = await Axios.post(
        `/stripe/verify-payment/${query?.session_id}`,
        payload
      );
      if (data?.paymentStatus === "paid") {
        const { data } = await Axios.get(`/user/${query.id}`);
        Cookies.set("user", JSON.stringify(data?.message));
        setUser(data?.message);
        toast.success("Credit Successfully!");
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!hasVerifiedRef.current && query?.session_id) {
      hasVerifiedRef.current = true;
      verifyPayment();
    }
  }, [query]);
  return (
    <div className="container">
      <Card className="mt-8">
        <CardHeader className="text-primary text-2xl">
          Payment Successful!
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Thank you for your purchase.</p>
        </CardContent>
      </Card>
    </div>
  );
}
