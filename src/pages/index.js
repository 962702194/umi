import { connect } from 'dva'
import Layout from '../component/Layout/Index'

const Index = props => (
  <Layout item={props.global.item} dispatch={props.dispatch}>
    {props.global.content}
  </Layout>
)

const mapStateToProps = state => ({
  global: state.global
})

export default connect(mapStateToProps)(Index)
