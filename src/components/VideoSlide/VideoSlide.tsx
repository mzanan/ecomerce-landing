import { motion } from "framer-motion"
import { useVideoSlide, VideoSlideProps } from "./useVideoSlide"

export const VideoSlide = ({
    slideId,
    activeView,
    view,
    rotationAxis,
    onTogglePlayback,
    children,
    className = ""
}: VideoSlideProps) => {
    const { animationProps, handleClick, isActive } = useVideoSlide({
        slideId,
        activeView,
        view,
        rotationAxis,
        onTogglePlayback
    })

    return (
        <motion.div
            key={`${view}-${slideId}`}
            {...animationProps}
            className={`${isActive ? "block" : "hidden"} group cursor-pointer h-full w-full ${className}`}
            onClick={handleClick}
        >
            {children}
        </motion.div>
    )
}





