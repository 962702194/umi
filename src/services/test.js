import { request } from '../utils/request'

export async function test () {
    const params = {}
    return request({url: `/test`, params})
  }