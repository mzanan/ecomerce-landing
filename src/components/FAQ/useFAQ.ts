import { useAnimations } from "@/hooks/useAnimations"

interface FAQ {
  question: string
  answer: string
}

export const useFAQ = () => {
  const { fadeInUp } = useAnimations()

  const faqs: FAQ[] = [
    {
      question: "Can I upgrade from Launch Ready to Custom Pro later?",
      answer: "Yes! You can start with Launch Ready and upgrade anytime as your business grows."
    },
    {
      question: "What payment gateways do you support?",
      answer: "Stripe is integrated by default, but we can add others on request."
    },
    {
      question: "Is the admin panel included?",
      answer: "Yes — both plans include a full admin dashboard."
    },
    {
      question: "How long does setup take?",
      answer: "Launch Ready stores are typically delivered within 5–7 days. Custom Pro timelines vary depending on complexity."
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