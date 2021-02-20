import request from '@/utils/request'

export default {
  getList(current, limit, carQuery) {
    return request({
      url: `/car/list/${current}/${limit}`,
      method: 'post',
      data: carQuery
    })
  },
  insertCar(car) {
    return request({
      url: `/car/insert`,
      method: 'post',
      data: car
    })
  },
  getCar(id) {
    return request({
      url: `/car/info/${id}`,
      method: 'get'
    })
  },
  updateCar(car) {
    return request({
      url: `/car/update`,
      method: 'post',
      data: car
    })
  }
}
