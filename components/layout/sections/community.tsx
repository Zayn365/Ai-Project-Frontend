"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DiscordIcon from "@/components/icons/discord-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CommunitySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <section
      id="community"
      className="py-12"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div
          className="lg:w-[60%] mx-auto"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <DiscordIcon />
                <div>
                  Ready to join this
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    Community?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent
              className="lg:w-[80%] text-xl text-muted-foreground"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Join our vibrant Discord community! Connect, share, and grow with
              like-minded enthusiasts. Click to dive in! 🚀
            </CardContent>

            <CardFooter data-aos="fade-up" data-aos-delay="400">
              <Button asChild>
                <a href="https://discord.com/" target="_blank" rel="noreferrer">
                  Join Discord
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
