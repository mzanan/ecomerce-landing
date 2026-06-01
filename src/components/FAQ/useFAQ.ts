import { useAnimations } from "@/hooks/useAnimations"

interface FAQ {
  question: string
  answer: string
}

export const useFAQ = () => {
  const { fadeInUp } = useAnimations()

  const faqs: FAQ[] = [
    {
      question: "Do I get the full source code?",
      answer: "Yes. You get the complete codebase to deploy on your own Vercel and own it outright, with no lock-in."
    },
    {
      question: "What payment gateways do you support?",
      answer: "Stripe is integrated by default, and others can be added on request."
    },
    {
      question: "Is the admin panel included?",
      answer: "Yes, it ships with a full admin dashboard for orders, stock, and customers."
    },
    {
      question: "How long does setup take?",
      answer: "With one-click deploy to Vercel, your store can be live in minutes. Custom changes depend on scope."
    }
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        delay: i * 0.2,
      },
    }),
  }

  return {
    faqs,
    fadeInUp,
    cardVariants,
  }
} 