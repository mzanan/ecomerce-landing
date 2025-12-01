"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from "lucide-react"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { NavButton } from "@/components/styles/buttons"
import { useDemo } from "./useDemo"

export const Demo = () => {
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
  } = useDemo()

  return (
    <section id="demo" className="section-layout md:container relative justify-center">
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
                <div className="relative h-full flex items-center justify-center">
                  {/* Desktop Video */}
                  <motion.div
                    key={`desktop-${idx}`}
                    initial={false}
                    animate={{
                      opacity: activeView === "desktop" ? 1 : 0,
                      scale: activeView === "desktop" ? 1 : 0.95,
                      rotateY: activeView === "desktop" ? 0 : -15
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`${
                      activeView === "desktop" ? "block" : "hidden"
                    } group cursor-pointer h-full w-full`}
                    onClick={() => toggleVideoPlayback(`desktop-${idx}`)}
                  >
                    <div className="px-4 md:mx-auto h-full flex items-center">
                      <video
                        ref={(el) => setVideoRef(`desktop-${idx}`, el)}
                        src={pair.desktop}
                        className="w-full h-full object-cover rounded-2xl"
                        loop
                        muted
                        playsInline
                        autoPlay
                        preload="metadata"
                      />
                    </div>
                  </motion.div>

                  {/* Mobile Video */}
                  <motion.div
                    key={`mobile-${idx}`}
                    initial={false}
                    animate={{
                      opacity: activeView === "mobile" ? 1 : 0,
                      scale: activeView === "mobile" ? 1 : 0.95,
                      rotateX: activeView === "mobile" ? 0 : -15
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`${
                      activeView === "mobile" ? "flex" : "hidden"
                    } flex-col items-center h-full w-full`}
                  >
                    <div className="relative group cursor-pointer h-full flex items-center justify-center">
                      <div onClick={() => toggleVideoPlayback(`mobile-${idx}`)}>
                        <PhoneMockup
                          videoSrc={pair.mobile}
                          animate={false}
                          setVideoRef={(el) => setVideoRef(`mobile-${idx}`, el)}
                          width="max-w-[280px] md:max-w-[340px] w-full"
                          height="h-full"
                        />
                      </div>
                    </div>
                  </motion.div>
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