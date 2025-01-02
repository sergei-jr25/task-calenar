import data from '@/shared/date.json'
import { useState } from 'react'

export const useHero = () => {
	const [activeIdx, setActiveIdx] = useState(5)

	const [dotOrder, setDotOrder] = useState<number[]>(() =>
		Array.from({ length: data?.items?.length }, (_, idx) => idx)
	)
	const [rotation, setRotation] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const [hoveredIndex, setHoveredIndex] = useState(null)

	const angleStep = 360 / dotOrder.length

	const groupEventsByYear = (
		events: Array<{ date: number; title: string }>,
		interval: number[]
	) => {
		const groupedEvents: { [key: number]: Array<{ title: string }> } = {}

		events.forEach(event => {
			if (interval.includes(event.date)) {
				if (!groupedEvents[event.date]) {
					groupedEvents[event.date] = []
				}
				groupedEvents[event.date].push(event)
			}
		})

		return groupedEvents
	}

	const handleClick = (idx: number) => {
		const newRotation = -angleStep * (idx + 1)

		setRotation(newRotation)
		setActiveIdx(idx)
		setIsLoading(false)
	}
	const handlePrevSlide = () => {
		if (activeIdx > 0) {
			const newRotation = rotation + angleStep
			setRotation(newRotation)
			setActiveIdx(activeIdx - 1)
		}
	}

	const handleNextSlide = () => {
		if (activeIdx < data?.items?.length - 1) {
			const newRotation = rotation - angleStep
			setRotation(newRotation)
			setActiveIdx(activeIdx + 1)
		}
	}

	const handleMouseEnter = (idx: number) => {
		console.log('handleMouseEnter')

		setHoveredIndex(idx)
	}

	const handleMouseLeave = () => {
		setHoveredIndex(null)
	}

	return {
		handleClick,
		handlePrevSlide,
		handleNextSlide,
		handleMouseEnter,
		handleMouseLeave,
		angleStep,
		hoveredIndex,
		isLoading,
		setIsLoading,
		dotOrder,
		activeIdx,
		rotation,
	}
}
