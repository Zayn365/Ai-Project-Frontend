"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "@/hooks/authHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Schema for Sign In and Sign Up
const signInUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const [isSubmitiing, setIsSubmiting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset for triggering animations
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const form = useForm<z.infer<typeof signInUpSchema>>({
    resolver: zodResolver(signInUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInUpSchema>) => {
    setIsSubmiting(true);

    await signIn(values.email, values.password, router);
    setIsSubmiting(false);
  };

  return (
    <section className="container flex items-center justify-center h-screen">
      <div
        className="flex flex-wrap justify-between sm:flex-row bg-muted/90 dark:bg-card max-w-4xl w-full shadow-lg rounded-lg overflow-hidden"
        data-aos="fade-up"
      >
        {/* Image Section */}
        <div
          className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <img src="./looker2.jpg" alt="Auth Illustration" />
        </div>

        {/* Form Section */}
        <Card
          className="w-full sm:w-1/2"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <CardHeader className="text-primary text-3xl font-bold !underline text-center">
            Sign In
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem data-aos="fade-up" data-aos-delay="400">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem data-aos="fade-up" data-aos-delay="500">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitiing}
                  className="mt-4 !bg-[#ea580c] hover:!bg-[#ea5a0ce1]"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  {isSubmitiing ? "Submitting..." : "Sign In"}
                </Button>

                {/* Forget Password and Terms Text */}
                <div className="text-center mt-4" data-aos="fade-in">
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary underline"
                  >
                    Forgot Password?
                  </a>
                  <p className="text-xs mt-2">
                    By signing in, you agree to our{" "}
                    <a href="/terms" className="text-primary underline">
                      Terms and Conditions
                    </a>
                    .
                  </p>
                  <p className="text-xs mt-2">
                    If you don&apos;t have an account
                    <a href="/signup" className="text-primary ml-1 underline">
                      Click Here!
                    </a>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </section>
  );
}
