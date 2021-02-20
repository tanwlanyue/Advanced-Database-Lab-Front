import request from '@/utils/request'

export default {
  getList(current, limit, reservationQuery) {
    return request({
      url: `/reservation/list/${current}/${limit}`,
      method: 'post',
      data: reservationQuery
    })
  },
  insertReservation(reservation) {
    return request({
      url: `/reservation/insert`,
      method: 'post',
      data: reservation
    })
  },
  getHotel(id) {
    return request({
      url: `/reservation/info/${id}`,
      method: 'get'
    })
  },
  updateReservation(reservation) {
    return request({
      url: `/reservation/update`,
      method: 'post',
      data: reservation
    })
  },
  deleteById(id) {
    return request({
      url: `/reservation/${id}`,
      method: 'delete'
    })
  }
}
