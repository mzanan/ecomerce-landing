import { useCallback, useEffect, useState } from "react"
import { type Transition } from "motion/react"

export const usePhoneMockup = (active = true) => {
  const [order, setOrder] = useState(initialOrder)
  const [buttonOrder, setButtonOrder] = useState([0, 1])
  const [elementColors, setElementColors] = useState(initialColors)
  const [flashingElements, setFlashingElements] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => setOrder((prev) => shuffle(prev)), 2600)
    return () => clearInterval(interval)
  }, [active])

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => setButtonOrder((prev) => shuffle(prev)), 2100)
    return () => clearInterval(interval)
  }, [active])

  const triggerFlash = useCallback((elementIndex: number) => {
    setFlashingElements(prev => new Set(prev).add(elementIndex))
    setTimeout(() => {
      setFlashingElements(prev => {
        const newSet = new Set(prev)
        newSet.delete(elementIndex)
        return newSet
      })
    }, 400)
  }, [])

  useEffect(() => {
    if (!active) return
    const intervals = [2500, 3200, 2800, 3500, 2200, 2900, 3800]

    const ids = intervals.map((interval, index) =>
      setInterval(() => {
        setElementColors((prev) => {
          const next = [...prev]
          next[index] = getRandomColor()
          return next
        })
        triggerFlash(index)
      }, interval)
    )

    return () => ids.forEach(clearInterval)
  }, [active, triggerFlash])

  const spring: Transition = {
    type: "spring",
    damping: 20,
    stiffness: 300,
  }

  return {
    order,
    buttonOrder,
    elementColors,
    flashingElements,
    spring,
    triggerFlash,
  }
}

const initialOrder = [0, 1, 2, 3, 4]

const initialColors = [
  "bg-purple-600", // Header
  "bg-purple-600", // Big card
  "bg-white",      // White card
  "bg-gray-400",   // Gray card
  "bg-purple-600", // Small purple button
  "bg-teal-400",   // Small teal button
  "bg-teal-400"    // Round button
]

const availableColors = [
  "bg-purple-600",
  "bg-teal-400",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-cyan-500"
]

const getRandomColor = (): string => {
  return availableColors[Math.floor(Math.random() * availableColors.length)]
}

const shuffle = ([...array]: number[]): number[] => {
  return array.sort(() => Math.random() - 0.5)
}
