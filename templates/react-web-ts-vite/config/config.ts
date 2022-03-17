interface IDefaultConfig {
	apiBaseUrl: {
		dev: string
		prod: string
	}
}

const defaultConfig: IDefaultConfig = {
	apiBaseUrl: {
		dev: '/api',
		prod: '/',
	},
}

export default defaultConfig
