import { useAnimations } from "@/hooks/useAnimations"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useForm } from "@formspree/react"
import { ContactForm } from "./useContact.types"

export const useContact = () => {
  const { fadeInUp } = useAnimations()
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? ""
  )

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully!")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }
  }, [state.succeeded])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.2 },
    },
  }

  return {
    fadeInUp,
    formData,
    isSubmitting: state.submitting,
    isSubmitted: state.succeeded,
    formVariants,
    handleInputChange,
    handleSubmit,
  }
}
