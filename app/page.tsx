import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "Ai Generator - Landing template",
  description: "Ai generator  landing page for developers",
  openGraph: {
    type: "website",
    url: "/",
    title: "Ai generator  - Landing template",
    description: "Free Ai generator  landing page for developers",
    images: [
      {
        url: "#",
        width: 1200,
        height: 630,
        alt: "Ai generator  - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "#",
    title: "Ai generator  - Landing template",
    description: "Free Ai generator  landing page for developers",
    images: ["#"],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      {/* <TeamSection /> */}
      <CommunitySection />
      {/* <PricingSection /> */}
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
