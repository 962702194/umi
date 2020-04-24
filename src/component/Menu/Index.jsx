import React from 'react'
import { Menu } from 'antd'

export default class Index extends React.Component {

  state = {
    item: [],
    selectedKeys: []
  }

  componentDidMount=()=>{
    this.init(this.props)
  }

  shouldComponentUpdate=(newProps, newState)=>{
    return true
  }

  componentWillReceiveProps=(newProps)=>{
    this.setState({item: newProps.item})
  }

  init=({item})=>{
    if(item) {
      const selectedKeys = item[0] ? [item[0].id] : []
      this.setState({item, selectedKeys})
    }
  }

  //{ item, key, keyPath, selectedKeys, domEvent }
  onSelect=({ selectedKeys, key })=>{
    // console.log('选中的item：==============', { item, key, keyPath, selectedKeys, domEvent })
    this.props.dispatch({type: 'global/updateState',payload:{content: this.state.item.find(v=>v.id === key).name}})
    this.setState({selectedKeys})
  }

  renderMenu = item => item.map(v=>(
    <Menu.Item key={v.id}>
      <span className='nav-text'>{v.name}</span>
    </Menu.Item>
  ))
  
  render = () => {
    const {item, selectedKeys} = this.state
    return (
      <Menu mode="inline" 
        selectedKeys={selectedKeys}
        onSelect={this.onSelect}
        onClick={this.onClick}
      >
        {this.renderMenu(item)}
      </Menu>
    )
  }
}
