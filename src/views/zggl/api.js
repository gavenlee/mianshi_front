import request from '@/utils/request'


export function getpage(params) {
  return request({
    url: '/api/zgsj/page',
    method: 'get',
    params
  })
}

export function getInfoByid(params) {
  return request({
    url: '/api/zgsj/page',
    method: 'get',
    params
  })
}



