import axios from 'axios'
import { HTTP_PATH } from './ipconfig'

const processUrl = async (url) => {
    if (url.indexOf('?') >= 0) {
      url = url + '&random=' + Math.random().toString(36).substr(2, 15)
    } else {
      url = url + '?random=' + Math.random().toString(36).substr(2, 15)
    }
    return url
}

export async function request ({url, params, method= 'POST', headers = {'Content-Type': 'application/json'}}) {
    const requestUrl = await processUrl(HTTP_PATH + url)
    return axios({
      method,
      url: requestUrl,
      headers,
      data: params
    }).then(res => {
      return res.data
    }).catch(err => {
      console.log(err)
      return false
    })
}