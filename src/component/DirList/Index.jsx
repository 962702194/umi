import React from 'react'
import { Menu, Dropdown, Icon, Button } from 'antd';
import RightMenu from '../RightMenu/Index'
import PubSub from 'pubsub-js'
import './Index.less'

export default class DirList extends React.Component{
    state={
        dirList: [], // 目录列表
        fileList: [], //文件列表
        dirName: null, //打开的目录名
        fileName: null, //打开的文件名
        left: 0,    //右击菜单的位置
        top: 0, 
        fileName2: null //右击菜单获取的文件名
    }

    pubsub = null

    componentWillMount=()=>{
       this.init()
    }

    componentDidMount=()=>{
        this.pubsub = PubSub.subscribe('dirList', this.myPubsub)
        window.addEventListener('click', this.clear)
        window.addEventListener('contextmenu', this.clear)
    }

    componentWillUnmount=()=>{ 
        PubSub.unsubscribe(this.pubsub)
        window.removeEventListener('click', this.clear)
        window.removeEventListener('contextmenu', this.clear)
        this.pubsub = null
    }

    clear=()=>{
        this.setState({fileName2:null})
    }

    myPubsub=(msg,data)=>{
        if(data&&this.state.dirName === data.dirName)this.getDirList(this.setDirANDFile)
        else this.getDirList(this.setDir)
    }

    init=()=>{
        this.getDirList(this.setDirANDFile)
    }
    getDirList=(fn)=>{
        this.props.dispatch({type: 'study/getDirList',payload:{callback:fn}})
    }
    setDirANDFile=({dir, file})=>{
        if(dir && dir instanceof Array)this.setState({dirList: dir, fileList: file, dirName: dir[0]})
    }
    setDir=({dir})=>{
        if(dir && dir instanceof Array)this.setState({dirList: dir})
    }

    getFileList=(e)=>{
        this.props.dispatch({type: 'study/getFileList',payload:{callback: this.setFile, dirName:e.target.innerText }})
    }
    setFile=(file, dirName)=>{
        if(file && file instanceof Array)this.setState({fileList: file, dirName: dirName})
    }

    getFileContent=(e)=>{
        const fileName = e.target.innerText
        this.props.dispatch({type: 'study/getFileContent',payload:{fileName, dirName: this.state.dirName }})
        this.setState({fileName})
    }

    getRightMenu=(e)=>{
        const event = e || window.event
        event.preventDefault()
        event.stopPropagation()
        this.setState({left: event.pageX ,top: event.pageY, fileName2:e.target.innerText})
    }

    renderList = ()=>{
        return this.state.fileList.map((item, index)=>{
            return <li title={item} className={this.state.fileName === item?'selected':null} key={index} onContextMenu={this.getRightMenu} onClick={this.getFileContent}>{item}</li>
        })
    }

    menu = ()=>{
        return this.state.dirList.map((item, index)=>{
            return (
                <Menu.Item key={index}>
                   <span style={{display: 'block'}} onClick={this.getFileList}>{item}</span>
                </Menu.Item>
            )
        })
    }

    menuDropdown=()=>{ 
        const menu = (<Menu>{this.menu()}</Menu>)
        return(
            <Dropdown className='dirDown' overlay={menu} trigger={['click']}>
                <Button style={{ marginLeft: 8 }}>
                    {this.state.dirName} <Icon type="down" />
                </Button>
            </Dropdown>
        )
    }

    setThisState=(obj)=>{
        this.setState({...obj})
    }

    render=()=>{
        const {left,top, fileName2, dirName} = this.state
        return (
            <div className='dirList'>
                {this.menuDropdown()}
                <ul className='fileList'>
                    {this.renderList()}
                </ul>
                <RightMenu
                    left={left} 
                    top={top} 
                    fileName={fileName2} 
                    setPropsState={this.setThisState} 
                    dispatch={this.props.dispatch} 
                    dirName={dirName}
                 />
            </div>
        )
    }
}