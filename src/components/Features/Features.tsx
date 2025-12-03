"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useFeatures } from "./useFeatures"
import { useEffect, useRef } from "react"
import { Feature } from "./useFeatures.types"

// --- Interfaces ---
interface MediaRendererProps {
  feature: Feature
  isModal?: boolean
  videoRef?: React.Ref<HTMLVideoElement>
  className?: string
}

// --- Sub-component: Media Renderer (Optimized with Aspect Ratios) ---
const MediaRenderer = ({ feature, isModal = false, videoRef, className = "" }: MediaRendererProps) => {
  if (feature.mediaType === "video") {
    const videoProps = {
      autoPlay: true, loop: true, muted: !isModal, controls: isModal, playsInline: true,
    }

    // Configuración de fuentes con Aspect Ratio Estricto
    const sources = [
      {
        src: feature.mobileMedia,
        visibility: "block md:hidden",
        aspectClass: "aspect-[9/16]", // Force 9:16 mobile
        ref: videoRef
      },
      {
        src: feature.media,
        visibility: "hidden md:block",
        aspectClass: "aspect-video video-compensate-rounded",  // Force 16:9 desktop
        ref: null
      },
    ]

    return (
      <>
        {sources.map((source, idx) => (
          <video
            key={idx}
            {...videoProps}
            ref={source.ref}
            src={source.src}
            // Combinamos visibilidad, aspect ratio y object-cover para recortar si es necesario
            className={`w-full ${source.aspectClass} ${source.visibility} object-cover ${isModal ? "rounded-2xl max-w-full max-h-full h-auto" : "h-auto"
              } ${className}`}
          />
        ))}
      </>
    )
  }

  // Renderizado de Imagen
  return (
    <div className={`relative ${isModal ? "w-auto h-auto max-w-full max-h-full" : "w-full h-full flex items-center justify-center bg-gray-100"}`}>
      <Image
        src={feature.media}
        alt={feature.title}
        width={isModal ? 1200 : 800}
        height={isModal ? 800 : 600}
        className={`${isModal ? "max-w-full max-h-full object-contain rounded-2xl" : "w-full h-full object-cover"}`}
        priority={!isModal && feature.id < 2}
      />
    </div>
  )
}

// --- Sub-component: Feature Info Card ---
const FeatureInfo = ({ feature }: { feature: Feature }) => (
  <Card className="h-full bg-white/50 backdrop-blur-sm border-white/30 flex flex-col overflow-hidden shadow-sm hover:bg-white/70 transition-all duration-300">
    <div className="p-6 pb-2 flex-none">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-300/10 flex items-center justify-center flex-none">
          <span className="text-xl md:text-2xl">{feature.icon}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-black leading-tight">
          {feature.title}
        </h3>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
        {feature.description}
      </p>
      <ul className="space-y-2">
        {feature.features.map((item: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 mt-1 flex-none" />
            <span className="text-sm md:text-base text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </Card>
)

// --- Main Component ---
export const Features = () => {
  const {
    features,
    mediaRefs,
    mediaVariants,
    textVariants,
    openedMedia,
    handleMediaClick,
    handleCloseModal,
  } = useFeatures()

  const modalVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (openedMedia?.feature.mediaType === "video" && modalVideoRef.current) {
      modalVideoRef.current.currentTime = openedMedia.currentTime || 0
    }
  }, [openedMedia])

  return (
    <>
      <section id="features" className="section-container">
        {features.map((feature, index) => {
          const isEven = index % 2 === 1

          return (
            <motion.div
              key={index}
              className={`snap-start h-dvh flex flex-col lg:flex-row gap-12 items-center justify-center ${!isEven ? "lg:flex-row-reverse" : ""
                }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Media Column */}
              <motion.div
                className="flex-3"
                custom={isEven}
                variants={mediaVariants}
              >
                <div
                  className="w-full h-auto bg-gray-900 rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => handleMediaClick(index, feature)}
                >
                  <MediaRenderer
                    feature={feature}
                    videoRef={(el) => { mediaRefs.current[index] = el }}
                  />
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div
                className="flex-1"
                custom={isEven}
                variants={textVariants}
              >
                <FeatureInfo feature={feature} />
              </motion.div>
            </motion.div>
          )
        })}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {openedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 md:-top-4 md:-right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              <MediaRenderer
                feature={openedMedia.feature}
                isModal={true}
                videoRef={modalVideoRef}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}