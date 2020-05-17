import React from 'react'
import {Button} from 'antd'
import { connect } from 'dva'
import Editor from '../../component/Editor/Index'
import DirList from '../../component/DirList/Index'
import './index.less'

class Study extends React.Component{
    apitest=()=>{
        this.props.dispatch({type:'study/apitest'})
    }
    upload=(e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        this.props.dispatch({type:'study/upload',payload: {formData}})
        e.target.value = null
    }
    uploadReady=()=>{
        this.refs.inputRef.click()
    }
    render=()=>{
        return (
            <div className='study'>
                <div className='studyBar'>
                    工具栏
                    <Button onClick={this.apitest}>测试api</Button>
                    <Button onClick={this.uploadReady}>测试上传文件</Button>
                    <input type='file' onChange={this.upload} multiple ref='inputRef' style={{display: 'none'}}/>
                </div>
                <div className='studyContent'>
                    <div className='studyList'>
                        {/* 目录 */}
                        <DirList dispatch={this.props.dispatch}/>
                    </div>
                    <div className='fileShow'>
                        {/* 内容 */}
                        <Editor />
                    </div>
                </div>
               
                {/* <DirList />
                <FileShow /> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    study: state.study
  })

export default connect(mapStateToProps)(Study)