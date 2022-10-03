import axios from 'axios'

const http = axios.create({
  timeout: 5000
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

const request = (options) => {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.params || options.data
    delete options.data
  }
  http.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
  return http(options)
}

export default request
