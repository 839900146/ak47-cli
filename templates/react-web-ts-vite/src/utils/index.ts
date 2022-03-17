interface ISelectFile {
	multiple?: boolean
	webkitdirectory: boolean
	accept: string
}

/**
 * 选择文件
 * @param conf 可选配置
 */
export const selectFile = (conf?: ISelectFile): Promise<FileList> => {
	return new Promise((resolve) => {
		const fileInput = document.createElement('input')
		fileInput.type = 'file'
		if (conf?.multiple) fileInput.setAttribute('multiple', 'true')
		if (conf?.webkitdirectory) fileInput.setAttribute('webkitdirectory', 'true')
		if (conf?.accept) fileInput.setAttribute('accept', conf.accept)
		fileInput.addEventListener('change', (e) => {
			const target = e.target as HTMLInputElement
			if (target && target.files) {
				resolve(target.files)
			}
		})
		fileInput.click()
	})
}

/**
 * 类型判断
 */
export function isType(value: unknown): string
export function isType(value: unknown, targetType?: string): boolean
export function isType(value: unknown, targetType?: string): string | boolean {
	const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
	if (targetType) {
		return (type === targetType) as boolean
	} else {
		return type as string
	}
}

/**
 * 网页全屏
 */
export const toFullScreen = (): void | boolean => {
	const el = document.documentElement

	const rfs =
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		el.requestFullScreen ||
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		el.webkitRequestFullScreen ||
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		el.mozRequestFullScreen ||
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		el.msRequestFullScreen

	if (rfs) {
		rfs.call(el)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
	} else if (typeof window.ActiveXObject !== 'undefined') {
		//for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const wscript = new ActiveXObject('WScript.Shell')
		if (wscript != null) {
			wscript.SendKeys('{F11}')
		}
	} else {
		return false
	}
}

/**
 *回到页面顶部
 */
export const scrollToTop = () => {
	const t = document.documentElement.scrollTop || document.body.scrollTop
	if (t > 0) {
		window.requestAnimationFrame(scrollToTop)
		window.scrollTo(0, t - t / 8)
	}
}

/**
 * 函数防抖
 * @param { function } fn 要执行的函数
 * @param { number } wait 延迟执行毫秒数
 * @param { boolean } immediate  true 表立即执行，false 表非立即执行
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(func: Function, time: number, immediate = false) {
	let timer: number | null = null
	return (...args: unknown[]) => {
		if (timer) clearInterval(timer)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const that: unknown = this
		if (immediate) {
			if (!timer) func.apply(that, args)
			timer = window.setTimeout(() => {
				timer = null
			}, time)
		} else {
			timer = window.setTimeout(() => {
				func.apply(that, args)
			}, time)
		}
	}
}

/**
 *
 * @param fn 要执行的函数
 * @param time 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(fn: Function, time: number, immediate = false) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const that: unknown = this
	if (immediate) {
		let prevTime = 0
		return (...args: unknown[]) => {
			const nowTime = Date.now()
			if (nowTime - prevTime >= time) {
				fn.apply(that, args)
				prevTime = nowTime
			}
		}
	} else {
		let timer: number | null = null
		return (...args: unknown[]) => {
			if (!timer) {
				fn.apply(that, args)
				timer = window.setTimeout(() => {
					if (timer) clearInterval(timer)
					timer = null
				}, time)
			}
		}
	}
}
