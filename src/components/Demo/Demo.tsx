"use client"

import { motion } from "motion/react"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { LazyVideo } from "@/components/LazyVideo/LazyVideo"
import { useDemo } from "./useDemo"

export const Demo = () => {
  const {
    slidePairs,
    setVideoRef,
    staggerContainer,
    itemFadeUp,
    isMobile,
    mobileIndex,
    advanceMobileVideo,
  } = useDemo()

  return (
    <section id="demo" className="section-layout h-dvh items-center">
      {isMobile === true && (
        <motion.div
          className="w-full px-4 flex justify-center"
          variants={itemFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <LazyVideo
            key={mobileIndex}
            src={slidePairs[mobileIndex].mobile}
            poster={slidePairs[mobileIndex].mobile.replace(/\.mp4$/, ".webp")}
            loop={false}
            onEnded={advanceMobileVideo}
            playbackRate={1.1}
            className="w-full max-w-sm aspect-[9/16] max-h-[75dvh] object-cover rounded-3xl shadow-xl"
          />
        </motion.div>
      )}

      {isMobile === false && (
        <motion.div
          className="w-full gap-2 px-4 flex justify-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {slidePairs.map((pair, idx) => (
            <motion.div
              key={idx}
              variants={itemFadeUp}
              className={`
                ${idx < 2 ? "block" : "hidden lg:block"}
                ${idx % 2 === 0 ? "pb-24" : "pt-24"}
              `}
            >
              <PhoneMockup
                videoSrc={pair.mobile}
                setVideoRef={(el) => setVideoRef(`mobile-${idx}`, el)}
                animate={false}
                height="min-h-[480px] max-h-[680px]"
                autoPlay
                playsInline
                muted
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
