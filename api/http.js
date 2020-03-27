import axios from 'axios'

import { FULL_URL_API, TOKEN_API } from '../utils/Constant'
// import { httpReq, httpReqDone } from '@/actions/screen'

// import store from '@/store'

const http = axios.create({
  baseURL: FULL_URL_API,
  timeout: 10000,
  headers: {
    'X-RapidAPI-Key': TOKEN_API
  }
})

http.interceptors.request.use( (config) => {
  // Do something before request is sent
  if (!config.headers['X-RapidAPI-Key']) {
    config.headers['X-RapidAPI-Key'] = TOKEN_API
  }
  // store.dispatch(httpReq())
  return config
}, (error) => {
  // Do something with request error
  // store.dispatch(httpReqDone())
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use( (response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // store.dispatch(httpReqDone())
  return response.data
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // store.dispatch(httpReqDone())
  return Promise.reject(error)
})

export default http