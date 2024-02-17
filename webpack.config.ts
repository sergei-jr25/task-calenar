import path from 'path'
import webpack from 'webpack'
import { buldWebpack } from './config/build/buldWebpack'
import { IBuildPaths, TypeMode, TypePLatform } from './config/build/types/types'

interface IEnvVariable {
	mode: TypeMode
	port: number
	analyzer: boolean
	platform?: TypePLatform
}

export default (env: IEnvVariable) => {
	const isDev = env.mode === 'development'
	const paths: IBuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const config: webpack.Configuration = buldWebpack({
		mode: env.mode ?? 'development',
		port: env.port ?? 5000,
		paths,
		analyzer: false,
		platform: env.platform ?? 'desktop',
	})

	// const config: webpack.Configuration = {
	// 	mode: env.mode ?? 'development',
	// 	entry: path.resolve(__dirname, 'src', 'index.tsx'),

	// 	output: {
	// 		path: path.resolve(__dirname, 'build'),
	// 		filename: '[name].js',
	// 		clean: true,
	// 	},
	// 	plugins: [
	// 		new HtmlWebpackPlugin({
	// 			template: path.resolve(__dirname, 'public', 'index.html'),
	// 		}),
	// 		new MiniCssExtractPlugin({
	// 			filename: 'css/[name].css',
	// 			chunkFilename: 'css/[name].[contenthash:8].css',
	// 		}),
	// 	],
	// 	module: {
	// 		rules: [
	// 			{
	// 				test: /\.s[ac]ss$/i,
	// 				use: [
	// 					// Creates `style` nodes from JS strings
	// 					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
	// 					// Translates CSS into CommonJS
	// 					'css-loader',
	// 					// Compiles Sass to CSS
	// 					'sass-loader',
	// 				],
	// 			},
	// 			// порядок имеет значение
	// 			{
	// 				// ts loader умеет работать с jsx
	// 				// без использовния тайп скрипт: нужен был бы babel loader
	// 				test: /\.tsx?$/,
	// 				use: 'ts-loader',
	// 				exclude: /node_modules/,
	// 			},
	// 		],
	// 	},
	// 	resolve: {
	// 		extensions: ['.tsx', '.ts', '.js'],
	// 	},
	// 	devtool: isDev && 'inline-source-map',
	// 	devServer: isDev
	// 		? {
	// 				port: env.port || 3000,
	// 				open: true,
	// 		  }
	// 		: undefined,
	// }

	return config
}
