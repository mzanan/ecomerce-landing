import { useAnimations } from "@/hooks/useAnimations"
import { useState } from "react"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export const useContact = () => {
  const { fadeInUp } = useAnimations()
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitted(false)
    }, 3000)
  }

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.2 },
    },
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      description: "Send us an email",
      value: "hello@gvtdevs.com",
    },
    {
      icon: "💬",
      title: "Chat",
      description: "Chat with our team",
      value: "Start a conversation",
    },
    {
      icon: "📍",
      title: "Office",
      description: "Visit our office",
      value: "San Francisco, CA",
    },
  ]

  return {
    fadeInUp,
    formData,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    formVariants,
    contactInfo,
  }
} 