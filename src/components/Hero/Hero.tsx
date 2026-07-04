import { ActionButtons } from "@/components/styles/buttons"
import { HeroMockup } from "./HeroMockup"
import {
  titleWordFadeIn,
  subtitleFadeIn,
  descriptionFadeIn,
  primaryButtonFadeIn,
  secondaryButtonFadeIn
} from "./heroIntro"

export const Hero = () => (
  <section className="section-layout section-container h-dvh">
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 sm:justify-center items-center h-full">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="text-center">
          <h1 className="xs:text-xl xm:text-2xl lg:text-7xl font-bold text-black">
            {"Launch your store today.".split(" ").map((word, index) => (
              <span key={index} {...titleWordFadeIn(index)}>
                {word}
              </span>
            ))}
          </h1>
          <p
            className={`xs:text-2xl xm:text-3xl lg:text-7xl font-bold bg-gradient-text ${subtitleFadeIn.className}`}
            style={subtitleFadeIn.style}
          >
            No code, no delays.
          </p>
        </div>

        <p
          className={`hidden md:block text-md md:text-xl text-gray-600 text-center max-w-3xl ${descriptionFadeIn.className}`}
          style={descriptionFadeIn.style}
        >
          A fully custom e‑commerce solution with admin dashboard, Stripe integration, mobile‑ready design, and branding. Ready to sell from day one.
        </p>

        <ActionButtons
          primaryButtonAnimation={primaryButtonFadeIn}
          secondaryButtonAnimation={secondaryButtonFadeIn}
          className="text-sm sm:text-base"
        />
      </div>

      <HeroMockup />
    </div>
  </section>
)
