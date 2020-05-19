import { request } from '../utils/request'

export async function upload ({formData:params}) {
    return request({url: '/upload', params,  headers: {'Content-Type': 'multipart/form-data'} })
}

export async function getDirList () {
    return request({url: '/getDirList', method: 'GET' })
}

export async function getFileList({dirName}){
    const params = { dirName }
    return request({url: '/getFileList', params})
}

export async function getFileContent({dirName, fileName}){
    const params = { dirName, fileName }
    return request({url: '/getFileContent', params})
}

export async function createDir({dirName}){
    const params = { dirName }
    return request({url: '/createDir', params})
}

export async function renameDir({dirName}){
    const params = { dirName }
    return request({url: '/renameDir', params})
}

export async function deleteDir({dirName}){
    const params = { dirName }
    return request({url: '/deleteDir', params})
}

export async function deleteFile({dirName,fileName}){
    const params = { dirName,fileName }
    return request({url: '/deleteFile', params})
}

export async function renameFile({dirName,fileName,rename}){
    const params = { dirName,fileName,rename }
    return request({url: '/renameFile', params})
}