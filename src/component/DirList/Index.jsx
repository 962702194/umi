import React from 'react'
import { Menu, Dropdown, Icon, Button } from 'antd';
import PubSub from 'pubsub-js'
import './Index.less'

export default class DirList extends React.Component{
    state={
        dirList: [],
        fileList: [],
        dirName: null,
        fileName: null
    }

    pubsub = null

    componentWillMount=()=>{
       this.init()
    }

    componentDidMount=()=>{
        this.pubsub = PubSub.subscribe('dirList', this.myPubsub)
    }

    componentWillUnmount=()=>{
        PubSub.unsubscribe(this.pubsub)
        this.pubsub = null
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

    renderList = ()=>{
        return this.state.fileList.map((item, index)=>{
            return <li className={this.state.fileName === item?'selected':null} key={index} onClick={this.getFileContent}>{item}</li>
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
    render=()=>{
        return (
            <div className='dirList'>
                {this.menuDropdown()}
                <ul className='fileList'>
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}