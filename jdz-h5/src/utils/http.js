import axios from 'axios'

const Http = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 20000, // 请求超时 20s
  withCredentials: true,
})

// 前置拦截器（发起请求之前的拦截）
Http.interceptors.request.use(
  config => {
    if (!config.params) config.params = {}
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 后置拦截器（获取到响应时的拦截）
Http.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      return Promise.reject(response.data)
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      console.error(`Code: ${code}, Message: ${msg}`)
    } else {
      console.error(`${error}`)
    }
    return Promise.reject(error)
  },
)

export default Http