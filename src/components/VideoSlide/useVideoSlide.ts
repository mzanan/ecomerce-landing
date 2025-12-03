export type VideoSlideProps = {
    slideId: string
    activeView: "desktop" | "mobile"
    view: "desktop" | "mobile"
    rotationAxis: "rotateY" | "rotateX"
    onTogglePlayback: (videoKey: string) => void
    children: React.ReactNode
    className?: string
}

export const useVideoSlide = ({
    slideId,
    activeView,
    view,
    rotationAxis,
    onTogglePlayback
}: Omit<VideoSlideProps, "children" | "className">) => {
    const isActive = activeView === view
    const videoKey = `${view}-${slideId}`

    const animationProps = {
        initial: false,
        animate: {
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.95,
            [rotationAxis]: isActive ? 0 : -15
        },
        transition: { duration: 0.4 }
    }

    const handleClick = () => onTogglePlayback(videoKey)

    return {
        animationProps,
        handleClick,
        isActive,
        videoKey
    }
}
