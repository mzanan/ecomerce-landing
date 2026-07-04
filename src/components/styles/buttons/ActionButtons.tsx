"use client"

import { CSSProperties } from "react"
import { ArrowRight } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "./index"
import { COMPANY } from "@/lib/socials"

interface IntroAnimation {
    className?: string
    style?: CSSProperties
}

interface ActionButtonsProps {
    className?: string
    primaryButtonAnimation?: IntroAnimation
    secondaryButtonAnimation?: IntroAnimation
}

export const ActionButtons = ({ className, primaryButtonAnimation, secondaryButtonAnimation }: ActionButtonsProps) => {
    return (
        <div className={`flex flex-row gap-4 items-center justify-center ${className}`}>
            <div
                className={`max-w-[290px] w-full ${primaryButtonAnimation?.className ?? ""}`}
                style={primaryButtonAnimation?.style}
            >
                <PrimaryButton
                    fullWidth
                    onClick={() => { window.location.href = COMPANY.buyUrl }}
                >
                    <span className="hidden sm:inline">Start Your Store Now</span>

                    <span className="inline sm:hidden">Start Now</span>
                    <ArrowRight className="w-5 h-5 ml-2 hidden md:inline" />
                </PrimaryButton>
            </div>
            <div
                className={`max-w-[290px] w-full ${secondaryButtonAnimation?.className ?? ""}`}
                style={secondaryButtonAnimation?.style}
            >
                <SecondaryButton
                    fullWidth
                    onClick={() => window.open(COMPANY.demoUrl, "_blank")}
                >

                    <span className="hidden sm:inline">View Live Demo</span>

                    <span className="inline sm:hidden">Live Demo</span>
                </SecondaryButton>
            </div>
        </div>
    )
}
