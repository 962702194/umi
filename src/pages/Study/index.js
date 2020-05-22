import React from 'react'
import {Button} from 'antd'
import { connect } from 'dva'
import Editor from '../../component/Editor/Index'
import DirList from '../../component/DirList/Index'
import Modal from '../../component/Modal/Index'
import {HandleDir} from './com'
import './index.less'

const initState = {
    isShow: false,
    option: ''
}

class Study extends React.Component{
    state={...initState}
    login=()=>{
        console.log('登录')
    }
    upload=(e)=>{
        const file = e.target.files[0]
        if(file.name.indexOf('.docx') === -1){
          return window.alert('只支持上传docx文件')
        }
        const formData = new FormData()
        formData.append('file', file)
        const dirName = window.prompt()
        if(dirName){
            formData.append('dirName', dirName)
            this.props.dispatch({type:'study/upload',payload: {formData}})
        }
        e.target.value = null
    }
    uploadReady=()=>{
        this.refs.inputRef.click()
    }
    createDir=()=>{
        this.setState({isShow: true, option: 'create'})
    }
    renameDir=()=>{
        this.setState({isShow: true, option: 'rename'})
    }
    deleteDir=()=>{
        this.setState({isShow: true, option: 'delete'}) 
    }
    confirm=(dirName)=>{
        switch(this.state.option){
            case 'create':
                this.props.dispatch({type:'study/createDir',payload:{dirName}})
                break
            case 'delete':
                this.props.dispatch({type:'study/deleteDir',payload:{dirName}})
                break
            default:
                this.props.dispatch({type:'study/renameDir',payload:{dirName}})
                break
        }
        this.cancel()
    }
    cancel=()=>{
        this.setState({...initState})
    }
    render=()=>{
        return (
            <div className='study'>
                <div className='studyBar'>
                    <Button onClick={this.login}>登录</Button>
                    <Button onClick={this.uploadReady}>上传文件</Button>
                    <Button onClick={this.createDir}>新建目录</Button>
                    <Button onClick={this.renameDir}>重命名目录</Button>
                    <Button onClick={this.deleteDir}>删除目录</Button>
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
                <Modal isShow={this.state.isShow}>
                    <HandleDir confirm={this.confirm} cancel={this.cancel}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    study: state.study
  })

export default connect(mapStateToProps)(Study)