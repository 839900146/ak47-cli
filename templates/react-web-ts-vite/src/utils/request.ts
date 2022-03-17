import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import defaultConfig from '@config/config'
const { apiBaseUrl } = defaultConfig

enum ResponseCode {
	NORMAL = 0,
	ROLE = 1,
	FOUND = 2,
	REFUSE = 3,
	SERVER = 4,
	OTHER = 5,
}

export interface ResponseType<T = null> {
	code: ResponseCode
	status: boolean
	message: string
	data: T | null
}

interface IRequest {
	<T>(config: AxiosRequestConfig): Promise<ResponseType<T>>
	get<T>(url: string, params: object): Promise<ResponseType<T>>
	del<T>(url: string, params: object): Promise<ResponseType<T>>
	head<T>(url: string, params: object): Promise<ResponseType<T>>
	post<T>(url: string, data: object, params?: object): Promise<ResponseType<T>>
	put<T>(url: string, data: object, params?: object): Promise<ResponseType<T>>
	patch<T>(url: string, data: object, params?: object): Promise<ResponseType<T>>
}

const instance = axios.create({
	baseURL: import.meta.env.DEV ? apiBaseUrl.dev : apiBaseUrl.prod,
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = window.localStorage.getItem('user-token')
	if (token && config.headers) {
		config.headers['x-token'] = token
	}
	return config
})

const request: IRequest = async <T>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
	try {
		const { data } = await instance.request<ResponseType<T>>(config)

		const { code } = data

		if (code === ResponseCode.ROLE) {
			console.log('权限错误')
		}

		return data
	} catch (error) {
		const message = (error as AxiosError).message || '请求失败'
		console.error(message) // 失败消息提示
		return {
			code: -1,
			status: false,
			message,
			data: null,
		}
	}
}

/**
 * get请求
 * @param url 请求路径
 * @param params 请求参数
 */
export const get = async <T>(url: string, params: object): Promise<ResponseType<T>> => {
	return request<T>({ method: 'get', url, params })
}

/**
 * delete请求
 * @param url 请求路径
 * @param params 请求参数
 */
export const del = async <T>(url: string, params: object): Promise<ResponseType<T>> => {
	return request<T>({ method: 'delete', url, params })
}

/**
 * head请求
 * @param url 请求路径
 * @param params 请求参数
 */
export const head = async <T>(url: string, params: object): Promise<ResponseType<T>> => {
	return request<T>({ method: 'head', url, params })
}

/**
 * post请求
 * @param url 请求路径
 * @param params 请求参数
 */
export const post = async <T>(
	url: string,
	data: object,
	params: object = {},
): Promise<ResponseType<T>> => {
	return request<T>({ method: 'post', url, data, params })
}

/**
 * put请求
 * @param url 请求路径
 * @param params 请求参数
 */
export const put = async <T>(
	url: string,
	data: object,
	params: object = {},
): Promise<ResponseType<T>> => {
	return request<T>({ method: 'put', url, data, params })
}

/**
 * patch请求
 * @param url 请求路径
 * @param params 请求参数
 */
export const patch = async <T>(
	url: string,
	data: object,
	params: object = {},
): Promise<ResponseType<T>> => {
	return request<T>({ method: 'patch', url, data, params })
}

request.get = get
request.post = post
request.del = del
request.head = head
request.put = put
request.patch = patch

export default request
