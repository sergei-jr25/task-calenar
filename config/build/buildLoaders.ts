import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { ModuleOptions } from 'webpack'
import { buildBabelLoader } from './babel/buildBabelLoader'
import { IBuildOptions } from './types/types'

export function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development'

	const imagesLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	}

	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: ['@svgr/webpack'],
	}

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
					},
				},
			},
			'sass-loader',
		],
	}
	const tsLoader = {
		// ts loader умеет работать с jsx
		// без использовния тайп скрипт: нужен был бы babel loader

		exclude: '/node_modules/',
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					// Отвечает за проверку на типизацию true - выключен, false включен
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: isDev,
				},
			},
		],
	}

	const babelLoader = buildBabelLoader(options)
	return [
		// порядок имеет значение
		imagesLoader,
		scssLoader,
		// tsLoader,
		babelLoader,
		svgLoader,
	]
}
