import React from 'react'
import { Layout } from 'antd'
import Menu from '../Menu/Index'

const { Content, Sider } = Layout

export default class Index extends React.Component {

  render = () => (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          background: 'transparent'
        }}
      >
        <Menu item = {this.props.item } dispatch={this.props.dispatch}/>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ overflow: 'initial' }}>
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
