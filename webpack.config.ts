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

	console.log(paths, 'paths')

	const config: webpack.Configuration = buldWebpack({
		mode: env.mode ?? 'development',
		port: env.port ?? 5000,
		paths,
		analyzer: false,
		platform: env.platform ?? 'desktop',
	})

	return config
}
