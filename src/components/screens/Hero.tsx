import data from '@/shared/date.json'
import { FC, useEffect, useMemo, useState } from 'react'
import './hero.scss'

import ArrowSVG from '@/shared/ui/ArrowSVG'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import useMediaQuery from '@/hooks/useMediaQuery'
import { SCALE } from '@/store/consts'
import Event from '../shared/components/Event/Event'

import { useHero } from './useHero'
export const translateOffsets = [246, 246, 248, 252, 253, 251]
export const translateOffsetsLabelY = [0, -1, -2, -4, -2, 2]
export const translateOffsetsLabelX = [15, 14, 15, 14, 10, 10]
const Hero: FC = () => {
	const [range, setRange] = useState<{ start: number; end: number }>(() => {
		const firstItem = data?.items?.[0]
		const interval = firstItem?.interval || []
		return {
			start: interval[0],
			end: interval[interval.length - 1],
		}
	})
	const {
		activeIdx,
		angleStep,
		rotation,
		dotOrder,
		handleClick,
		handleMouseEnter,
		handleMouseLeave,
		handleNextSlide,
		handlePrevSlide,
		hoveredIndex,
		isLoading,
		setIsLoading,
	} = useHero()

	const isMedia = useMediaQuery('(max-width:767px)')
	const dotOrderReverse = [...dotOrder].reverse()
	console.log(activeIdx, ' activeIdx')

	useEffect(() => {
		const firstItem = data?.items?.[activeIdx]
		const interval = firstItem?.interval || []

		const intervalId = setInterval(() => {
			setIsLoading(true)

			setRange(prev => {
				if (
					prev.start < interval[0] ||
					prev.end < interval[interval.length - 1]
				) {
					if (prev.start === interval[0]) {
						return { ...prev, end: prev.end + 1 }
					} else if (prev.end === interval[interval.length - 1]) {
						return { ...prev, start: prev.start + 1 }
					}
					return { start: prev.start + 1, end: prev.end + 1 }
				} else if (
					prev.start > interval[0] ||
					prev.end > interval[interval.length - 1]
				) {
					if (prev.start === interval[0]) {
						return { ...prev, end: prev.end - 1 }
					} else if (prev.end === interval[interval.length - 1]) {
						return { ...prev, start: prev.start - 1 }
					}
					return { start: prev.start - 1, end: prev.end - 1 }
				}
				setIsLoading(false)

				clearInterval(intervalId)
				return prev
			})
		}, 100)

		return () => clearInterval(intervalId)
	}, [activeIdx])

	const translateOffsets = [246, 246, 248, 252, 253, 251]
	const translateOffsetsLabelY = [1, -1, -2, -4, -2, 2]
	const translateOffsetsLabelX = [15, 14, 15, 14, 10, 10]

	return (
		<div className='hero'>
			<div className='hero__container container'>
				{' '}
				<div className='hero__line'></div>
				<div className='hero__wrapper'>
					<div className='hero__body'>
						<h1 className='hero__title title'>Исторические даты</h1>
						<div className='hero__content content-hero'>
							<div className='content-hero__range'>
								<span>{range.start}</span>
								<span>{range.end}</span>
							</div>
							<div className='content-hero__circle circle'>
								<div
									className='circle__body'
									style={{
										transform: `rotate(${rotation}deg)`,
									}}
								>
									{useMemo(
										() =>
											dotOrder.map((dotIdx, idx) => {
												const isActive = activeIdx === idx
												const translateCountX = translateOffsets[idx] || 252
												const isHovered = hoveredIndex === idx
												const scale = isActive || isHovered ? SCALE : 1
												console.log(
													translateOffsetsLabelX[idx],
													'translateOffsetsLabelX[idx]'
												)

												return (
													<button
														key={idx}
														onMouseMove={() => handleMouseEnter(idx)}
														onMouseLeave={handleMouseLeave}
														className={`circle__point point-circle dot dot-${
															idx + 1
														} ${
															activeIdx === idx ? 'point-circle_active' : ''
														}`}
														style={{
															transform: `rotate(${
																angleStep * idx
															}deg) translate(${translateCountX}px) rotate(-${
																angleStep * idx
															}deg) scale(${scale}`,
															transformOrigin: 'center',
														}}
														type='button'
														onClick={() => handleClick(dotIdx)}
													>
														<span
															className='point-circle__number'
															style={{
																transform: `rotate(${
																	angleStep * (activeIdx + 1)
																}deg) translate(0, -1px)`,
															}}
														>
															{dotIdx + 1}
														</span>
														<div
															className='point-circle__text'
															style={{
																transform: `rotate(${
																	angleStep * (idx + 1)
																}deg)translate(${
																	translateOffsetsLabelX[idx] || 12
																}px, ${
																	translateOffsetsLabelY[activeIdx] || -2
																}px)`,
																display:
																	isHovered && !isActive ? 'none' : 'block',
															}}
														>
															{data.items[idx].label}
														</div>
													</button>
												)
											}),
										[dotOrder, activeIdx, hoveredIndex, angleStep]
									)}
								</div>
							</div>
							{!isMedia && (
								<div className='content-hero__arrows arrows-hero'>
									<div className='arrows-hero__count'>
										{'0' + (activeIdx + 1)}/{'0' + data?.items?.length}
									</div>
									<div className='arrows-hero__actions'>
										<button
											disabled={activeIdx === 0}
											className={'arrows-hero__arrow arrows-hero__arrow_prev'}
											onClick={handlePrevSlide}
										>
											<ArrowSVG />
										</button>
										<button
											disabled={data.items.length - 1 === activeIdx}
											onClick={handleNextSlide}
											className='arrows-hero__arrow arrows-hero__arrow_next'
										>
											<ArrowSVG />
										</button>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='hero__items hero-items'>
						{data?.items?.map((item, index) => (
							<>
								{activeIdx === index && (
									<div
										className={`events ${!isLoading ? 'events_active' : ''}`}
									>
										<Swiper
											spaceBetween={25}
											slidesPerView={1.5}
											breakpoints={{
												767: {
													slidesPerView: 3,
													spaceBetween: 80,
												},
											}}
											modules={[Navigation]}
											navigation={{
												nextEl: '.events__arrows .arrows__next',
												prevEl: '.events__arrows .arrows__prev',
											}}
										>
											{item?.events.map(el => (
												<SwiperSlide className='events__slide'>
													<Event
														key={el.title}
														time={el.date}
														title={el.title}
													/>
												</SwiperSlide>
											))}
											<div className='events__arrows arrows-events'>
												<button className='arrows-events_arrow arrows-events_prev arrows__prev'>
													<ArrowSVG />
												</button>
												<button className='arrows-events_arrow arrows-events_next arrows__next'>
													<ArrowSVG />
												</button>
											</div>{' '}
										</Swiper>
									</div>
								)}
							</>
						))}
					</div>
					{isMedia && (
						<div className='hero__footer footer-hero'>
							<div className='arrows-hero'>
								<div className='arrows-hero__count'>
									{'0' + (activeIdx + 1)}/{'0' + data?.items?.length}
								</div>
								<div className='arrows-hero__actions'>
									<button
										disabled={activeIdx === 0}
										className={'arrows-hero__arrow arrows-hero__arrow_prev'}
										onClick={handlePrevSlide}
									>
										<ArrowSVG />
									</button>
									<button
										disabled={data.items.length - 1 === activeIdx}
										onClick={handleNextSlide}
										className='arrows-hero__arrow arrows-hero__arrow_next'
									>
										<ArrowSVG />
									</button>
								</div>
							</div>
							<div className='footer-hero__dots dots'>
								{dotOrder.map((_, idx) => (
									<button
										onClick={() => handleClick(idx)}
										className={`dots__item ${
											idx === activeIdx ? 'dots__item_active' : ''
										}`}
									></button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
export default Hero
