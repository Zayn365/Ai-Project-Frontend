"use client";
import React, { useState } from "react";
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
  const [isSubmitiing, setIsSubmiting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signInUpSchema>>({
    resolver: zodResolver(signInUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInUpSchema>) => {
    setIsSubmiting(true);
    await signUp(values.email, values.password);
    setIsSubmiting(false);
    // console.log(values);
  };

  return (
    <section className="container pt-24 sm:pt-32 flex justify-center">
      <div className="flex flex-col sm:flex-row bg-muted/90 dark:bg-card max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center">
          <img src="./looker.jpg" />
        </div>

        {/* Form Section */}
        <Card className="w-full sm:w-1/2">
          <CardHeader className="text-primary text-3xl font-bold !underline text-center">
            SignUp
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

                {/* Confirm Password Field (only for sign-up) */}
                {form.watch("confirmPassword") !== undefined && (
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
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
                  disabled={isSubmitiing}
                  variant="default"
                  className="mt-4"
                >
                  Sign Up
                </Button>

                {/*  */}

                <div className="text-center mt-4">
                  <p className="text-xs mt-2">
                    Are you already{" "}
                    <span className="text-primary">SignedUp?</span> Then Please{" "}
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
