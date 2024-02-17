import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { IBuildOptions } from './types/types'

export function DevServer(options: IBuildOptions): DevServerConfiguration {
	return {
		port: options.port || 3000,
		open: true,
		historyApiFallback: true,

		// Отвечает за обновление страницы
		hot: true,
	}
}
