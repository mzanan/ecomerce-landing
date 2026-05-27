"use client"

import { motion, HTMLMotionProps } from "motion/react"
import { ArrowRight } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "./index"
import { COMPANY } from "@/lib/socials"

interface ActionButtonsProps {
    className?: string
    primaryButtonAnimation?: HTMLMotionProps<"div">
    secondaryButtonAnimation?: HTMLMotionProps<"div">
}

export const ActionButtons = ({ className, primaryButtonAnimation, secondaryButtonAnimation }: ActionButtonsProps) => {
    return (
        <motion.div className={`flex flex-row gap-4 items-center justify-center ${className}`}>
            <motion.div
                className="max-w-[290px] w-full"
                {...primaryButtonAnimation}
            >
                <PrimaryButton
                    fullWidth
                    onClick={() => {
                        document.getElementById('pricing')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }}
                >
                    <span className="hidden sm:inline">Start Your Store Now</span>

                    <span className="inline sm:hidden">Start Now</span>
                    <ArrowRight className="w-5 h-5 ml-2 hidden md:inline" />
                </PrimaryButton>
            </motion.div>
            <motion.div
                className="max-w-[290px] w-full"
                {...secondaryButtonAnimation}
            >
                <SecondaryButton
                    fullWidth
                    onClick={() => window.open(COMPANY.demoUrl, "_blank")}
                >

                    <span className="hidden sm:inline">View Live Demo</span>

                    <span className="inline sm:hidden">Live Demo</span>
                </SecondaryButton>
            </motion.div>
        </motion.div>
    )
}
