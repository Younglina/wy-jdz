// const BASE_URL = "https://www.fastmock.site/mock/b4d00c361872b35cd786f9536d504667/jdz/api"
const BASE_URL = "http://localhost:3001/api"

const baseRequest = async (url, method, data = {}) => {
  let header = {}
  return new Promise((reslove, reject) => {
    uni.request({
      url: BASE_URL + url,
      method: method || 'GET',
      header: header,
      timeout: 10000,
      withCredentials: true,
      data: data || {},
      success: (successData) => {
        const res = successData.data
        if (successData.statusCode == 200) {
          reslove(res.data)
        } else {
          reject(res)
        }
      },
      fail: (msg) => {
        reject(msg)
      }
    })
  })
}

const request = {}

const methods = ['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect']
methods.map((item) => {
  request[item] = (api, data) => baseRequest(api, item, data)
})

export default request