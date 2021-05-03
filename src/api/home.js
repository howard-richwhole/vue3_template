import request from '@/utils/request'

export function test(data) {
  return request({
    url: '/api/test',
    method: 'post',
    data,
  })
}
