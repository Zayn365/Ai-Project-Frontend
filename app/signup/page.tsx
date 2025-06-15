"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { signUp } from "@/hooks/authHooks";
import { useRouter } from "next/navigation";

// Schema for Sign In and Sign Up
const signInUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

export default function AuthPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const form = useForm<z.infer<typeof signInUpSchema>>({
    resolver: zodResolver(signInUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInUpSchema>) => {
    setIsSubmitting(true);
    await signUp(values.email, values.password, router);
    setIsSubmitting(false);
  };

  return (
    <section className="container flex justify-center items-center h-screen">
      <div
        className="flex flex-col sm:flex-row bg-muted/90 dark:bg-card max-w-4xl w-full shadow-lg rounded-lg overflow-hidden"
        data-aos="fade-up"
      >
        {/* Image Section */}
        <div
          className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <img src="./looker.jpg" alt="SignUp Illustration" />
        </div>

        {/* Form Section */}
        <Card
          className="w-full sm:w-1/2"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <CardHeader
            className="text-primary text-3xl font-bold !underline text-center"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            Sign Up
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
                    <FormItem data-aos="fade-up" data-aos-delay="500">
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
                    <FormItem data-aos="fade-up" data-aos-delay="600">
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

                {/* Confirm Password Field (only for sign-up) */}
                {form.watch("confirmPassword") !== undefined && (
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem data-aos="fade-up" data-aos-delay="700">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="default"
                  className="mt-4 !bg-[#ea580c]"
                  data-aos="zoom-in"
                  data-aos-delay="800"
                >
                  Sign Up
                </Button>

                <div
                  className="text-center mt-4"
                  data-aos="fade-in"
                  data-aos-delay="900"
                >
                  <p className="text-xs mt-2">
                    Are you already{" "}
                    <span className="text-primary">Signed Up?</span> Then Please{" "}
                    <a href="/signin" className="text-primary underline">
                      Click Here!
                    </a>
                    .
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
