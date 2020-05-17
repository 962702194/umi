import {test} from '../../../services/test'
import {upload, getDirList, getFileList, getFileContent} from '../../../services/file'
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
        *apitest({payload},{put,call,select}){
            const result = yield call(test)
            alert(result)
        },
        *upload({payload},{call}){
          const {formData} = payload
          const result = yield call(upload, {formData})
          alert(result)
        },
        *getDirList({payload},{call}){
          const {callback} = payload
          const result = yield call(getDirList)
          if(result) callback(result)
        },
        *getFileList({payload},{call}){
          const {callback,dirName} = payload
          const result = yield call(getFileList,{dirName})
          if(result) callback(result, dirName)
        },
        *getFileContent({payload},{call}){
          const {fileName, dirName} = payload
          const result = yield call(getFileContent,{fileName, dirName})
          if(result) {
             PubSub.publish('braftEditor',{data: result})
          }
        }
    },
    reducers: {
      updateState (state, action) {
        return { ...state, ...action.payload }
      }
    }
  }
  