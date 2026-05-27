import { useEffect, useState } from "react"
import { type Transition } from "motion/react"

export const usePhoneMockup = () => {
  const [order, setOrder] = useState(initialOrder)
  const [buttonOrder, setButtonOrder] = useState([0, 1])
  const [elementColors, setElementColors] = useState(initialColors)
  const [flashingElements, setFlashingElements] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 1500)
    return () => clearTimeout(timeout)
  }, [order])

  useEffect(() => {
    const timeout = setTimeout(() => setButtonOrder(shuffle(buttonOrder)), 1000)
    return () => clearTimeout(timeout)
  }, [buttonOrder])

  // Color change effects with different intervals
  useEffect(() => {
    const intervals = [
      2500, // Header
      3200, // Big card
      2800, // White card
      3500, // Gray card
      2200, // Small purple button
      2900, // Small teal button
      3800  // Round button
    ]

    const timeouts = intervals.map((interval, index) => {
      return setTimeout(() => {
        const newColors = [...elementColors]
        newColors[index] = getRandomColor()
        setElementColors(newColors)
        triggerFlash(index)
      }, interval)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [elementColors])

  const triggerFlash = (elementIndex: number) => {
    setFlashingElements(prev => new Set(prev).add(elementIndex))
    setTimeout(() => {
      setFlashingElements(prev => {
        const newSet = new Set(prev)
        newSet.delete(elementIndex)
        return newSet
      })
    }, 400)
  }

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
