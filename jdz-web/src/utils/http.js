import axios from 'axios'

const _axios = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 20000, // 请求超时 20s
  withCredentials: true,
})

// 前置拦截器（发起请求之前的拦截）
_axios.interceptors.request.use(
  config => {
    if (!config.params) config.params = {}
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 后置拦截器（获取到响应时的拦截）
_axios.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      throw response.data
    } else {
      return response.data
    }
  },
  error => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      throw `Code: ${code}, Message: ${msg}`
    } else {
      return Promise.reject(error)
    }
  },
)

export default class Http {
  static async request(method, url , data){
    const param = {
      url,
      method,
      data: method === 'GET' ? null : data,
      params: method === 'GET' ? data : null,
    }

    const res = await _axios(param)
    if(res.code === 200)
      return res
    throw res
  }

  static get(url, data){
    return this.request('GET', url, data)
  }

  static post(url, data){
    return this.request('POST', url, data)
  }
}
