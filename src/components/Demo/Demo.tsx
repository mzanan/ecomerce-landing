"use client"

import { useState } from "react"
import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { useDemo } from "./useDemo"

export const Demo = () => {
  const { slidePairs, setVideoRef } = useDemo()
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
      autoPlay
      playsInline
      muted
      onEnded={onEnded}
    />
  )

  return (
    <section id="demo" className="section-layout h-dvh items-center">
      {/* --- VISTA MÓVIL (sm) --- */}
      <div className="flex md:hidden w-full justify-center px-4">
        <DemoItem
          idx={`mobile-loop-${mobileIndex}`}
          src={slidePairs[mobileIndex].mobile}
          onEnded={() => setMobileIndex((prev) => (prev + 1) % slidePairs.length)}
        />
      </div>

      {/* --- VISTA ESCRITORIO (md+) --- */}
      <div className="hidden md:flex w-full gap-2 px-4 justify-center">
        {slidePairs.map((pair, idx) => (
          <div
            key={idx}
            className={`
              ${idx < 2 ? "block" : "hidden lg:block"}
              ${idx % 2 === 0 ? "pb-52" : "pt-52"}
            `}
          >
            <DemoItem
              idx={idx}
              src={pair.mobile}
            />
          </div>
        ))}
      </div>
    </section>
  )
}