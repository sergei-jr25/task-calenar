import { FC } from 'react'
import './Event.scss'

interface IEvent {
	title: string
	time: string
}
const Event: FC<IEvent> = ({ time, title }) => {
	return (
		<div className='event'>
			<div className='event__time'>{time}</div>
			<div className='event__title'>{title}</div>
		</div>
	)
}
export default Event
