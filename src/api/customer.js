import request from '@/utils/request'

export default {
  getList(current, limit, customerQuery) {
    return request({
      url: `/customer/list/${current}/${limit}`,
      method: 'post',
      data: customerQuery
    })
  },
  insertCustomer(customer) {
    return request({
      url: `/customer/insert`,
      method: 'post',
      data: customer
    })
  },
  getCustomer(id) {
    return request({
      url: `/customer/info/${id}`,
      method: 'get'
    })
  },
  updateCustomer(customer) {
    return request({
      url: `/customer/update`,
      method: 'post',
      data: customer
    })
  }
}
