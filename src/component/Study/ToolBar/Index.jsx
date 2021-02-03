import React from 'react'
import Modal from '../../Modal/Index'
import { HandleDir } from '../../Com/Index'
import { Button } from 'antd';
import './Index.less'

const initState = {
    isShow: false,
    option: ''
}
 
export default class ToolBar extends React.Component{
    
    state={...initState} 

    dirName=null

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
        if(this.dirName){
            formData.append('dirName', this.dirName)
            this.props.dispatch({type:'study/upload',payload: {formData}})
            this.dirName = null
        }
        e.target.value = null
    }
    uploadReady=()=>{
        this.setState({isShow: true, option: 'upload'})
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
    confirm=(dirName, oldName)=>{
        switch(this.state.option){
            case 'upload':
                this.dirName = dirName
                this.refs.inputRef.click()
                break
            case 'create':
                this.props.dispatch({type:'study/createDir',payload:{dirName}})
                break
            case 'delete':
                this.props.dispatch({type:'study/deleteDir',payload:{dirName}})
                break
            default:
                this.props.dispatch({type:'study/renameDir',payload:{dirName, oldName}})
                break
        }
        this.cancel()
    }
    cancel=()=>{
        this.setState({...initState})
    }
    render=()=>{
        const {option, isShow} = this.state
        return (
            <div className='studyBar'>
                <Button onClick={this.login}>登录</Button>
                <Button onClick={this.uploadReady}>上传文件</Button>
                <Button onClick={this.createDir}>新建目录</Button>
                <Button onClick={this.renameDir}>重命名目录</Button>
                <Button onClick={this.deleteDir}>删除目录</Button>

                <input type='file' onChange={this.upload} multiple ref='inputRef' style={{display: 'none'}}/>
                
                <Modal isShow={isShow}>
                    <HandleDir confirm={this.confirm} cancel={this.cancel} option={option}/>
                </Modal>
            </div>
        )
    }
}