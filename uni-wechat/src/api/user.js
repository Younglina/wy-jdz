/**
 * @description 授权登录
 * @param {*} data 
 */
export function wxLogin(data) {
	return uni.request({
		url: '/wx/code2Session',
		method: 'post',
		data
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

