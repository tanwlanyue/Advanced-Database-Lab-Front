import request from '@/utils/request'

export default {
  getList(current, limit, flightQuery) {
    return request({
      url: `/flight/list/${current}/${limit}`,
      method: 'post',
      data: flightQuery
    })
  },
  insertFlight(flight) {
    return request({
      url: `/flight/insert`,
      method: 'post',
      data: flight
    })
  },
  getFlight(id) {
    return request({
      url: `/flight/info/${id}`,
      method: 'get'
    })
  },
  updateFlight(flight) {
    return request({
      url: `/flight/update`,
      method: 'post',
      data: flight
    })
  }
}
