import { connect } from 'dva'
import App from './Index/index'

const Index = props => <App {...props}/>

const mapStateToProps = state => ({
  global: state.global
})

export default connect(mapStateToProps)(Index)
