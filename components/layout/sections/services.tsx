"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Custom Domain Integration",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit adipisicing.",
    pro: 0,
  },
  {
    title: "Social Media Integrations",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, dicta.",
    pro: 0,
  },
  {
    title: "Email Marketing Integrations",
    description: "Lorem dolor sit amet adipisicing.",
    pro: 0,
  },
  {
    title: "SEO Optimization",
    description: "Lorem ipsum dolor sit amet consectetur.",
    pro: 1,
  },
];

const ServiceCard = ({ title, description, pro }: ServiceProps) => (
  <Card
    className="bg-muted/60 dark:bg-card h-full relative"
    data-aos="zoom-in"
    data-aos-delay="200"
  >
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {description || "No description available."}
      </CardDescription>
    </CardHeader>
    {pro === ProService.YES && (
      <Badge variant="secondary" className="absolute -top-2 -right-3">
        PRO
      </Badge>
    )}
  </Card>
);

export const ServicesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2
        className="text-lg text-primary text-center mb-2 tracking-wider"
        data-aos="fade-down"
      >
        Services
      </h2>
      <h2
        className="text-3xl md:text-4xl text-center font-bold mb-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Grow Your Business
      </h2>
      <h3
        className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        From marketing and sales to operations and strategy, we have the
        expertise to help you achieve your goals.
      </h3>
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {serviceList.map((service, index) => (
          <ServiceCard
            key={service.title}
            {...service}
            data-aos="fade-up"
            data-aos-delay={index * 100 + 300} // Stagger animations
          />
        ))}
      </div>
    </section>
  );
};
