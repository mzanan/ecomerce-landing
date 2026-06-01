"use client"

import { motion } from "motion/react"
import { Check, Loader2, Send } from "lucide-react"
import { PrimaryButton } from "@/components/styles/buttons"
import { useContact } from "./useContact"

const fieldClasses =
  "w-full bg-transparent border-b border-black/20 focus:border-pink-500 outline-none text-black text-lg md:text-xl py-2 placeholder:text-black/30 transition-colors disabled:opacity-50"

export const Contact = () => {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    staggerContainer,
    itemFadeUp,
  } = useContact()

  const disabled = isSubmitting || isSubmitted

  return (
    <section id="contact" className="section-layout h-dvh">
      <div className="section-container">
        <motion.div
          className="w-full max-w-3xl mx-auto flex flex-col gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemFadeUp} className="text-center space-y-3">
            <h2 className="main-heading">Get in touch</h2>
            <p className="sub-heading">
              Have a question or want to work together? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div variants={itemFadeUp} className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-gray-500">Name</label>
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} disabled={disabled} placeholder="Your name" className={fieldClasses} />
              </motion.div>
              <motion.div variants={itemFadeUp} className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-500">Email</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} disabled={disabled} placeholder="you@email.com" className={fieldClasses} />
              </motion.div>
            </div>
            <motion.div variants={itemFadeUp} className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm text-gray-500">Message</label>
              <textarea id="message" name="message" rows={3} required value={formData.message} onChange={handleInputChange} disabled={disabled} placeholder="Tell us about your project…" className={`${fieldClasses} resize-none`} />
            </motion.div>
            <motion.div variants={itemFadeUp} className="self-center mt-2">
              <PrimaryButton
                type="submit"
                disabled={disabled}
                isLoading={disabled}
                loadingText={
                  isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Message Sent!
                    </>
                  ) : null
                }
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </PrimaryButton>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
