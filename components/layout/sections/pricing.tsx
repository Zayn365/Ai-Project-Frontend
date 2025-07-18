"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Axios } from "@/utils/Axios";
import { useAppContext } from "@/context/AppContext";
import useUrl from "@/hooks/useUrl";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Free",
    popular: 0,
    price: 0,
    description:
      "Get started with our AI content creation tools for free. Perfect for individuals exploring content generation.",
    buttonText: "Start Free Trial",
    benefitList: [
      "10 credits",
      "Basic eBook and blog creation",
      "Community support",
      "Limited text-to-speech (1 voice)",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 49,
    description:
      "Unlock advanced AI tools and higher credit limits for professional content creators and small teams.",
    buttonText: "Get Started",
    benefitList: [
      "500 credits",
      "Advanced eBook, blog, and story creation",
      "Basic music and video generation",
      "Priority email support",
      "Text-to-speech (5 voices)",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 149,
    description:
      "Tailored for businesses with high-volume content needs. Access premium features and dedicated support.",
    buttonText: "Get Started",
    benefitList: [
      "2000 credits",
      "Full access to eBook, blog, story, music, and video creation",
      "Custom AI model training",
      "Priority phone and email support",
      "Text-to-speech (10 voices + custom voice)",
    ],
  },
];

const stripePromise = loadStripe(
  "pk_test_51RllpuE6R0pkKdswsz0k9Io0kmZ2mSqKiM7puIkpGpzW5WFwpaq3ltGv0KYbTl2iD7ZLPZgvI1Cxb8Hk7sjSDDkO00LFwCsNlf"
);

export const PricingSection = () => {
  const { user } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState({
    title: "Premium",
    price: 49,
  });

  const { host } = useUrl();

  const handleCardClick = (title: string, price: number) => {
    setSelectedPlan({ title, price });
  };

  const handleCheckout = async () => {
    try {
      if (selectedPlan.price === 0) {
        return;
      }
      const stripe = await stripePromise;
      const response = await Axios.post("/stripe/create-checkout-session", {
        product: {
          name: selectedPlan?.title,
          price: selectedPlan?.price,
          quantity: 1,
        },
        userId: user?.id,
        email: user?.email,
        domain: host,
        quan:
          selectedPlan?.price === 49
            ? 500
            : selectedPlan?.price === 149
            ? 2000
            : 0,
      });

      if (response.status !== 200) {
        alert(`Error: ${response.status}`);
        return;
      }
      // Redirect to Stripe Checkout
      const result = await stripe?.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result?.error) {
        alert(`Redirect Error: ${result.error.message}`);
      }
    } catch (error) {
      alert("Failed to initiate checkout. Please try again.");
      console.error(error);
    }
  };

  return (
    <section className="container py-4">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Get unlimitted access
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Flexible plans designed to supercharge your content creation with
        AI-powered tools for eBooks, blogs, music, videos, and more.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              onClick={() => handleCardClick(title, price)}
              className={`cursor-pointer transition-all duration-300 ${
                selectedPlan.title === title
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : "hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">${price}</span>
                  {/* <span className="text-muted-foreground"> /month</span> */}
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onMouseEnter={() => handleCardClick(title, price)}
                  onClick={handleCheckout}
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
