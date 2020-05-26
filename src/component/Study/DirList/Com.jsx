import React from 'react'
import './Com.less'

export default class RightMenu extends React.Component{
    delete=()=>{
        this.props.dispatch({type:'study/deleteFile', payload: {fileName: this.props.fileName,dirName:this.props.dirName}})
        this.props.setPropsState({fileName2: null}) 
    }
    rename=()=>{
        this.props.setPropsState({isShow: true})
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