"use client"

import { motion } from "framer-motion"
import { Check, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useContact } from "./useContact"

export const Contact = () => {
  const {
    fadeInUp,
    formData,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    formVariants,
    contactInfo,
  } = useContact()

  return (
    <section id="contact" className="relative snap-start py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center space-y-6 mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-black">
            Get in touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question or want to work together? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full backdrop-blur-sm border border-gray-200/50 bg-white/10 shadow-lg rounded-xl">
              <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting || isSubmitted}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting || isSubmitted}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What&apos;s this about?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting || isSubmitted}
                  />
                </div>

                <div className="space-y-2 flex-1 pb-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your project..."
                    rows={8}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting || isSubmitted}
                    className="resize-none h-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-medium px-6 py-3 rounded-full transition-all duration-300 bg-black text-white hover:bg-black/80 hover:scale-105 mt-auto"
                  size="lg"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 backdrop-blur-sm border border-gray-200/50 bg-white/10 shadow-lg rounded-xl hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
                        <span className="text-2xl">{info.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-black mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {info.description}
                        </p>
                        <p className="text-black font-medium">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Response - Full Width */}
        <motion.div
          className="mt-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 backdrop-blur-sm border border-gray-200/50 bg-white/10 shadow-lg rounded-xl">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-black">
                Quick Response
              </h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
              <div className="flex justify-center gap-2 text-sm text-gray-500">
                <span>Mon-Fri</span>
                <span>•</span>
                <span>9AM-6PM PST</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 