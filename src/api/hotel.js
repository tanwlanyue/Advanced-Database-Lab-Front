import request from '@/utils/request'

export default {
  getList(current, limit, hotelQuery) {
    return request({
      url: `/hotel/list/${current}/${limit}`,
      method: 'post',
      data: hotelQuery
    })
  },
  insertHotel(hotel) {
    return request({
      url: `/hotel/insert`,
      method: 'post',
      data: hotel
    })
  },
  getHotel(id) {
    return request({
      url: `/hotel/info/${id}`,
      method: 'get'
    })
  },
  updateHotel(teacher) {
    return request({
      url: `/hotel/update`,
      method: 'post',
      data: teacher
    })
  }
}
