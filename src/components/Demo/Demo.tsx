"use client"

import { PhoneMockup } from "@/components/PhoneMockup/PhoneMockup"
import { useDemo } from "./useDemo"

export const Demo = () => {
  const {
    slidePairs,
    setVideoRef
  } = useDemo()

  return (
    <section id="demo" className="section-layout">
      <div className="flex w-full gap-2 px-4 justify-center">
        {slidePairs.map((pair, idx) => (
          <div
            key={idx}
            className={`
              ${idx < 2 ? "md:block" : "md:hidden"}
              lg:block
              ${idx % 2 === 0 ? "md:pb-52" : "md:pt-52"}
            `}
          >
            <PhoneMockup
              videoSrc={pair.mobile}
              animate={false}
              setVideoRef={(el) => setVideoRef(`mobile-${idx}`, el)}
              autoPlay={true}
              playsInline
              muted
              width="w-full"
              height="h-full"
              className="aspect-[9/16] max-h-[900px] lg:max-h-none"
            />
          </div>
        ))}
      </div>
    </section>
  )
}