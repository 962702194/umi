import React from 'react'
import './Index.less'

export default class RightMenu extends React.Component{
    delete=()=>{
        this.props.dispatch({type:'study/deleteFile', payload: {fileName: this.props.fileName,dirName:this.props.dirName}})
        this.props.setPropsState({fileName2: null}) 
    }
    rename=()=>{
        const rename = window.prompt()
        if(rename){
            this.props.dispatch({type:'study/renameFile', payload: {fileName: this.props.fileName,dirName:this.props.dirName,rename}})
        }
        this.props.setPropsState({fileName2: null}) 
    }
    render=()=>{
        const {left, top, fileName} = this.props
        if(!fileName) return null
        return (
            <div className='rightMenu' style={{left,top}}>
                <p onClick={this.delete}>删除</p>
                <p onClick={this.rename}>重命名</p>
            </div>
        )
    }
}