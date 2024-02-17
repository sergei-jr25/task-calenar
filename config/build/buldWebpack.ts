import webpack from 'webpack'
import { DevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlagins } from './buildPlagins'
import { buildResolvers } from './buildResolvers'
import { IBuildOptions } from './types/types'
export type Mode = 'production' | 'development'

export function buldWebpack(options: IBuildOptions): webpack.Configuration {
	const { paths, mode, port } = options
	const isDev = mode === 'development'

	console.log(mode)

	return {
		mode: mode ?? 'development',
		entry: paths.entry,

		output: {
			path: paths.output,
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: buildPlagins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),

		devtool: isDev && 'inline-source-map', // Удобно дебажить код
		devServer: isDev ? DevServer(options) : undefined,
	}
}
