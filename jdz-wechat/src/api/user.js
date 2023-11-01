/**
 * @description 授权登录
 * @param {*} data 
 */
const baseUrl = 'http://localhost:3000/api'
export function wxLogin(jsCode) {
	return uni.request({
		url: `${baseUrl}/wx/login`,
		method: 'post',
		data: {jsCode}
	})
}

/**
 * @description 获取手机号
 * @param {*} data 
 */
export function getPhoneNumber(data) {
	return uni.request({
		url: '/wx/getPhoneNumber',
		method: 'post',
		data
	})
}

