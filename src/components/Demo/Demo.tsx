"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { useDemo } from "./useDemo"

export const Demo = () => {
  const { slidePairs, setVideoRef, staggerContainer, itemFadeUp } = useDemo()
  const [mobileIndex, setMobileIndex] = useState(0)

  const DemoItem = ({
    src,
    idx,
    onEnded,
  }: {
    src: string,
    idx: number | string,
    onEnded?: () => void,
    className?: string
  }) => (
    <PhoneMockup
      key={`demo-video-${idx}`}
      videoSrc={src}
      setVideoRef={(el) => setVideoRef(`mobile-${idx}`, el)}
      animate={false}
      height="min-h-[480px] max-h-[680px]"
      autoPlay
      playsInline
      muted
      onEnded={onEnded}
    />
  )

  return (
    <section id="demo" className="section-layout h-dvh items-center">
      <motion.div
        className="flex md:hidden w-full justify-center px-4"
        variants={itemFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DemoItem
          idx={`mobile-loop-${mobileIndex}`}
          src={slidePairs[mobileIndex].mobile}
          onEnded={() => setMobileIndex((prev) => (prev + 1) % slidePairs.length)}
        />
      </motion.div>

      <motion.div
        className="hidden md:flex w-full gap-2 px-4 justify-center"
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
            <DemoItem
              idx={idx}
              src={pair.mobile}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
