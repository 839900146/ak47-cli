import type { ProxyOptions } from 'vite'

interface IProxyItems {
	[prefix: string]: ProxyOptions | string
}

/**
 * 服务器列表
 */
const servers = {
	server1: 'https://xxx.com',
	server2: 'https://yyy.com',
}

/**
 * 代理配置
 */
const Proxys: IProxyItems = {
	'^/v1': servers.server1,
	'^/v2': {
		target: servers.server2,
		changeOrigin: true,
	},
}

export default Proxys
