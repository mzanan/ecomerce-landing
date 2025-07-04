"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from "lucide-react"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { NavButton } from "@/components/styles/buttons"
import { useHeroSlideshow } from "./useHeroSlideshow"

export const HeroSlideshow = () => {
  const {
    currentSlide,
    activeView,
    slidePairs,
    setActiveView,
    nextSlide,
    prevSlide,
    toggleVideoPlayback,
    setVideoRef,
    emblaRef
  } = useHeroSlideshow()

  return (
    <section id="features" className="md:container relative snap-start min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 max-w-6xl w-full h-full mx-auto justify-center">
        {/* View Toggle */}
        <div className="flex items-center justify-center">
          <div className="flex flex-row-reverse md:flex-row bg-slate-100 rounded-full p-1 relative">
            <motion.div
              className="absolute inset-y-1 bg-white rounded-full shadow-sm"
              initial={false}
              animate={{
                x: activeView === "desktop" ? 0 : "100%",
                width: activeView === "desktop" ? "50%" : "50%"
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <NavButton
              onClick={() => setActiveView("desktop")}
              active={activeView === "desktop"}
              className="relative z-10"
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </NavButton>
            <NavButton
              onClick={() => setActiveView("mobile")}
              active={activeView === "mobile"}
              className="relative z-10"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </NavButton>
          </div>
        </div>

        {/* Video Display Side - Swipeable */}
        <div className="relative h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {slidePairs.map((pair, idx) => (
              <div key={idx} className="flex-none w-full h-full">
                <div className="relative h-full">
                  <AnimatePresence mode="wait">
                    {activeView === "desktop" ? (
                      <motion.div
                        key={`desktop-${idx}-${activeView}`}
                        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                        transition={{ duration: 0.6 }}
                        className="relative group cursor-pointer h-full rounded-2xl"
                        onClick={() => toggleVideoPlayback(`desktop-${idx}`)}
                      >
                        
                        {/* Desktop Frame */}
                        <div className="px-4 md:mx-auto">
                          <video
                            ref={(el) => setVideoRef(`desktop-${idx}`, el)}
                            src={pair.desktop}
                            className="w-full h-full object-cover rounded-2xl"
                            loop
                            muted
                            playsInline
                            autoPlay
                          />
                          </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`mobile-${idx}-${activeView}`}
                        initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center h-full"
                      >
                        <div className="relative group cursor-pointer h-full flex items-center justify-center">

                          {/* PhoneMockup Component */}
                          <div onClick={() => toggleVideoPlayback(`mobile-${idx}`)}>
                            <PhoneMockup 
                              videoSrc={pair.mobile} 
                              animate={false} 
                              setVideoRef={(el) => setVideoRef(`mobile-${idx}`, el)} 
                              width = "max-w-[280px] md:max-w-[340px] w-full"
                              height = "h-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="flex items-center justify-center gap-4">
          <NavButton onClick={prevSlide}>
            <ChevronLeft className="w-4 h-4" />
          </NavButton>

          <div className="flex space-x-2">
            {slidePairs.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? "bg-blue-600 w-8" : "bg-slate-300"
                }`}
              />
            ))}
          </div>

          <NavButton onClick={nextSlide}>
            <ChevronRight className="w-4 h-4" />
          </NavButton>
        </div>
      </div>
    </section>
  )
} 