import React from 'react'
import BraftEditor from 'braft-editor'
import PubSub from 'pubsub-js'
import 'braft-editor/dist/index.css'
import './Index.less'

export default class EditorDemo extends React.Component {

  state = {
      editorState: null
  }

  pubsub = null

  componentDidMount = () => {
    this.setState({
      editorState: BraftEditor.createEditorState(null)
    })
    this.pubsub = PubSub.subscribe('braftEditor', this.myPubsub)
  }

  componentWillUnmount = () => {
    PubSub.unsubscribe(this.pubsub)
    this.pubsub = null
  }

  myPubsub=(msg, data)=>{
    this.setState({editorState: BraftEditor.createEditorState(data.data)})
  }

  submitContent = () => {
    const htmlContent = this.state.editorState.toHTML()
    console.log(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render () {
    const { editorState } = this.state
    return (
        <div className='editor'>
            <BraftEditor
                value={editorState}
                onChange={this.handleEditorChange}
                onSave={this.submitContent}
            />
        </div>
    )
  }

}