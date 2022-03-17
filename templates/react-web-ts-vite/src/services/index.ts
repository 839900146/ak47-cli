import { get, post } from '@/utils/request'

/**
 * 查询用户信息
 */
export async function queryUserInfo<T>(params: object = {}) {
	return get<T>('/test', params)
}

/**
 * 修改用户信息
 */
export async function changeUserInfo<T>(params: object = {}) {
	return post<T>('/test', params)
}
