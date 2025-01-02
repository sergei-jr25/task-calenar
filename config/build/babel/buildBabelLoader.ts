import { IBuildOptions } from '../types/types'
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin'

export function buildBabelLoader({ mode }: IBuildOptions) {
	return {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					['@babel/preset-env', { targets: 'defaults' }],
					'@babel/preset-typescript',
					[
						'@babel/preset-react',
						{
							runtime: 'automatic',
						},
					],
				],
				plugins: [[removeDataTestIdBabelPlugin, { props: ['data-testid'] }]],
			},
		},
	}
}
