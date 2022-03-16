import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import proxy from './config/proxy'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	resolve: {
		alias: [
			{ find: '@', replacement: resolve(__dirname, 'src') },
			{ find: '@config', replacement: resolve(__dirname, 'config') },
			{ find: '@cpt', replacement: resolve(__dirname, 'src/component') },
			{ find: '@views', replacement: resolve(__dirname, 'src/views') },
		],
	},
	plugins: [
		react(),
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		}),
		viteCompression(),
	],
	css: {
		postcss: {
			plugins: [
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				require('autoprefixer')({
					overrideBrowserslist: ['Chrome > 61', 'ie >= 8', '> 1%'],
					grid: true,
				}),
			],
		},
		modules: {
			localsConvention: 'camelCase',
		},
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	build: {
		reportCompressedSize: false,
		sourcemap: 'inline',
	},
	server: {
		host: '0.0.0.0',
		proxy,
	},
})
