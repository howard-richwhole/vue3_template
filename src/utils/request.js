import axios from 'axios'
import store from '@/store'

// axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30 * 1000,
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  ({ data }) => {
    return data
  },
  error => {
    return Promise.reject(error)
  },
)

export default service
