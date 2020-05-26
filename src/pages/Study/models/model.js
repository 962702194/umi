import {upload, getDirList, getFileList, getFileContent, createDir, renameDir, deleteDir, deleteFile, renameFile} from '../../../services/file'
import PubSub from 'pubsub-js'

export default {
  namespace: 'study',
  state: {
  },
  subscriptions: {
    setup ({ dispatch, history }) {

    }
  },
  effects: {
    * upload ({payload}, {call}) {
      const {formData} = payload
      const result = yield call(upload, {formData})
      if(result)alert('上传成功')
      else alert('上传失败')
    },
    * getDirList ({payload}, {call}) {
      const {callback} = payload
      const result = yield call(getDirList)
      if (result) callback(result)
    },
    * getFileList ({payload}, {call}) {
      const {callback, dirName} = payload
      const result = yield call(getFileList, {dirName})
      if (result) callback(result, dirName)
    },
    * getFileContent ({payload}, {call}) {
      const {fileName, dirName} = payload
      const result = yield call(getFileContent, {fileName, dirName})
      if (result) {
        PubSub.publish('braftEditor', {data: result})
      }
    },
    * createDir ({payload}, {call}) {
      const {dirName} = payload
      const result = yield call(createDir, {dirName})
      if (result) {
        alert('创建成功')
        PubSub.publish('dirList')
      } else{
        alert('创建失败')
      }
    },
    * renameDir ({payload}, {call}) {
      const {dirName, oldName} = payload
      const result = yield call(renameDir, {dirName, oldName})
      if (result) {
        alert('重命名成功')
        PubSub.publish('dirList')
      }else {
        alert('重命名失败')
      }
    },
    * deleteDir ({payload}, {call}) {
      const {dirName} = payload
      const result = yield call(deleteDir, {dirName})
      if (result) {
        alert('删除成功')
        PubSub.publish('dirList', {dirName})
      }else {
        alert('删除失败')
      }
    },
    * deleteFile ({payload}, {call}) {
      const {dirName, fileName} = payload
      const result = yield call(deleteFile, {dirName, fileName})
      if (result) {
        alert('删除成功')
        PubSub.publish('dirList', {dirName})
      }else {
        alert('删除失败')
      }
    },
    * renameFile ({payload}, {call}) {
      const {dirName, fileName, rename} = payload
      const result = yield call(renameFile, {dirName, fileName, rename})
      if (result) {
        alert('修改成功')
        PubSub.publish('dirList', {dirName})
      }else {
        alert('修改失败')
      }
    }
  },
  reducers: {
    updateState (state, action) {
      return { ...state, ...action.payload }
    }
  }
}

