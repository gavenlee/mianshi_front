import request from '@/utils/request'

export function ifCanLogin(params) {
  return request({
    url: '/api/zgsj/ifCanLogin',
    method: 'get',
    params
  })
}
