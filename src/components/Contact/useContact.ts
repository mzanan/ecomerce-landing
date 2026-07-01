import { useAnimations } from "@/hooks/useAnimations"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useForm } from "@formspree/react"
import { ContactForm } from "./useContact.types"

export const useContact = () => {
  const { staggerContainer, itemFadeUp } = useAnimations()
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

  return {
    formData,
    setFormData,
    isSubmitting: state.submitting,
    isSubmitted: state.succeeded,
    handleInputChange,
    handleSubmit,
    staggerContainer,
    itemFadeUp,
  }
}
