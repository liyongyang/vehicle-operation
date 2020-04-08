import axios from 'axios'
import { Loading } from 'element-ui'

let loadingInstance
let loadingCount = 0
export function showLoading () {
  if (loadingCount === 0) {
    loadingInstance = Loading.service({
      fullscreen: false,
      text: 'Loading',
      lock: true,
      background: 'rgba(0, 0, 0, 0.3)'
    })
  }
  loadingCount++
}
export function HideLoading () {
  if (loadingCount <= 0) return
  loadingCount--
  if (loadingCount === 0) {
    loadingInstance.close()
  }
}

axios.defaults.timeout = 5000

axios.interceptors.request.use(
  config => {
    config.withCredentials = true
    config.timeout = 6000
    let token = sessionStorage.getItem('token')
    token && (config.headers.Authorization = token)
    if (config.useLoading) {
      showLoading()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    HideLoading()
    if (response.data.status) {
      if (response.data.status === 'success') {
        if (response.data.result) {
          return response.data.result
        } else if (response.data.message) {
          return response.data.message
        } else {
          return response.data
        }
      } else {
        return Promise.reject(response.data.message)
      }
    } else {
      return response.data
    }
  },
  error => {
    HideLoading()
    if (error.response.data.message) {
      return Promise.reject(error.response.data.message)
    } else {
      return Promise.reject(error.response.data)
    }
  }
)

export default axios
