"use client"

import { motion, HTMLMotionProps } from "framer-motion"
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
        <motion.div className={`flex flex-col md:flex-row gap-4 items-center justify-center ${className}`}>
            <motion.div
                className="w-full sm:w-auto"
                {...primaryButtonAnimation}
            >
                <PrimaryButton
                    fullWidth
                    className="sm:w-auto"
                    onClick={() => {
                        document.getElementById('pricing')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }}
                >
                    Start Your Store Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                </PrimaryButton>
            </motion.div>
            <motion.div
                className="w-full sm:w-auto"
                {...secondaryButtonAnimation}
            >
                <SecondaryButton
                    fullWidth
                    className="sm:w-auto"
                    onClick={() => window.open(COMPANY.demoUrl, "_blank")}
                >
                    View Live Demo
                </SecondaryButton>
            </motion.div>
        </motion.div>
    )
}
