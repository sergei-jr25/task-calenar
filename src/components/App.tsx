import img from '@/assets/Portman.jpg'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from './App.module.scss'
// import classes from './App.module.scss'

function char(a: number) {
	console.log(a)
}

const App = () => {
	const [count, setCount] = React.useState(0)

	// if (__PLATFORM__ === 'desktop') {
	// 	return <h1>ISDEKCTOPPLATOFRM</h1>
	// }
	// if (__PLATFORM__ === 'mobile') {
	// 	return <h1>ISMOBILEPLATFORM</h1>
	// }

	function doto() {
		error()
	}

	function error() {
		throw new Error('Error')
	}

	const handleClick = () => {
		doto()
	}

	return (
		<div data-testid={'AppTestId'}>
			<h1 data-testid={'AppTitle'} style={{ color: 'red' }}>
				PLATFORM {__PLATFORM__}
			</h1>
			<h2>2 title</h2>

			<div className={styles.links}>
				<Link to={'/about'}>About</Link>
				<Link to={'/shop'}>Shop</Link>
			</div>
			{/* <Vector /> */}
			<div>
				<img width={40} height={40} src={img} />
			</div>
			<div className={styles.vlaue}>{count}</div>
			<button onClick={handleClick}>Increase</button>

			<Outlet />
		</div>
	)
}
export default App
