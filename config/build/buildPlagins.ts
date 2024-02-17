import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { IBuildOptions } from './types/types'

export function buildPlagins(options: IBuildOptions): Configuration['plugins'] {
	const { mode, paths, analyzer, platform } = options
	const isDev = mode === 'development'
	const isProd = mode === 'production'
	console.log(paths.public)

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, 'favicon.png'),
		}),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
		}),

		// Выносит проверку типов в отдельный процесс, не нагружая сборку
		new ForkTsCheckerWebpackPlugin(),
	]

	// Делаем код более читабельным

	if (isDev) {
		plugins.push(new ProgressPlugin(), new ReactRefreshWebpackPlugin())
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
				chunkFilename: 'css/[name].css',
			})
		)

		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'locale'),
						to: path.resolve(paths.output, 'locale'),
					},
				],
			})
		)
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	return plugins
}
