"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useDemo } from "./useDemo"
import { useEffect, useRef } from "react"

export const Demo = () => {
  const {
    demoFeatures,
    mediaRefs,
    mediaVariants,
    textVariants,
    openedMedia,
    handleMediaClick,
    handleCloseModal,
  } = useDemo()
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (openedMedia && openedMedia.feature.mediaType === "video" && modalVideoRef.current) {
      modalVideoRef.current.currentTime = openedMedia.currentTime || 0
    }
  }, [openedMedia])

  return (
    <>
      <section id="demo" className="relative snap-start py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-black">
              See it in action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how it works.
            </p>
          </motion.div>

          <div className="space-y-16">
            {demoFeatures.map((feature, index) => {
              const isEven = index % 2 === 1

              return (
                <motion.div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <motion.div
                    className="flex-1 h-[400px]"
                    custom={isEven}
                    variants={mediaVariants}
                  >
                    <div className="relative h-full">
                      <div 
                        className="h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => handleMediaClick(index, feature)}
                      >
                        {feature.mediaType === "video" ? (
                          <video
                            ref={(el) => {
                              mediaRefs.current[index] = el
                            }}
                            src={feature.media}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            ref={(el) => {
                              mediaRefs.current[index] = el
                            }}
                            className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl overflow-hidden"
                          >
                            <Image
                              src={feature.media}
                              alt={feature.title}
                              width={800}
                              height={600}
                              priority={index < 2}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex-1 md:h-[400px]"
                    custom={isEven}
                    variants={textVariants}
                  >
                    <Card className="p-8 h-full bg-white/50 backdrop-blur-sm border-white/30 hover:bg-white/70 transition-all duration-300">
                      <div className="space-y-4 h-full flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
                            <span className="text-2xl">{feature.icon}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-black">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed flex-1">
                          {feature.description}
                        </p>
                        <ul className="space-y-2">
                          {feature.features.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-center gap-3"
                            >
                              <Check className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative max-w-6xl max-h-full flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              {openedMedia.feature.mediaType === "video" ? (
                <video
                  ref={modalVideoRef}
                  src={openedMedia.feature.media}
                  autoPlay
                  loop
                  controls
                  className="max-w-full max-h-full rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                  <Image
                    src={openedMedia.feature.media}
                    alt={openedMedia.feature.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 