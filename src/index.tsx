import App from '@/components/App'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AboutLazy } from './components/pages/About/AboutLazy'
import { ShopLazy } from './components/pages/Shop/ShopLazy'
const root = document.querySelector('#root')

if (!root) {
	throw new Error('root not found')
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/about',
				element: (
					<Suspense fallback={<div>...Loading </div>}>
						<AboutLazy />,
					</Suspense>
				),
			},
			{
				path: '/shop',
				element: (
					<Suspense fallback={<div>...Loading </div>}>
						<ShopLazy />,
					</Suspense>
				),
			},
		],
	},
])

const container = createRoot(root)
container.render(<RouterProvider router={router} />)
