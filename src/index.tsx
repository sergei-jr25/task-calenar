import '@fontsource/pt-sans/400.css' // Regular
import '@fontsource/pt-sans/700.css' // Bold
import { createRoot } from 'react-dom/client'
import App from './App'

const root = document.querySelector('#root')

if (!root) {
	throw new Error('root not found')
}

const container = createRoot(root)
container.render(<App />)
