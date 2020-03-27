import http from './http'

export default {
  getStatistics (params) {
    return http.get(`statistics`, { params }).then((resp) => {
      return resp
    })
  },
  getCountries () {
    return http.get(`countries`).then((resp) => {
      return resp
    })
  },
  getHistory (params) {
    return http.get(`history`, { params }).then((resp) => {
      return resp
    })
  }
}