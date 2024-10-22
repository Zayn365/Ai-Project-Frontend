"use client";
import React from "react";
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

// Schema for Sign In and Sign Up
const signInUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const form = useForm<z.infer<typeof signInUpSchema>>({
    resolver: zodResolver(signInUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInUpSchema>) => {
    console.log(values); // Handle sign-in/sign-up logic
  };

  return (
    <section className="container pt-24 sm:pt-32 flex justify-center">
      <div className="flex flex-col sm:flex-row bg-muted/90 dark:bg-card max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center">
          <img src="./looker2.jpg" />
        </div>
        {/* Form Section */}
        <Card className="w-full sm:w-1/2">
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
                    <FormItem>
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
                    <FormItem>
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
                <Button type="submit" variant="default" className="mt-4">
                  Sign In
                </Button>

                {/* Forget Password and Terms Text */}
                <div className="text-center mt-4">
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
                    If you don't have an account
                    <a href="/signup" className="text-primary ml-1 underline">
                      Click Here!
                    </a>
                    .
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>{" "}
      </div>
    </section>
  );
}
