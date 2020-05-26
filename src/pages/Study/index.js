import React from 'react'
import { connect } from 'dva'
import { ToolBar, Editor, DirList } from '../../component/Study/Index'
import './index.less'

const Study = ({dispatch}) =>{
    return (
        <div className='study'>
            <ToolBar dispatch={dispatch}/>
            <div className='studyContent'>
                <div className='studyList'>
                    {/* 目录 */}
                    <DirList dispatch={dispatch}/>
                </div>
                <div className='fileShow'>
                    {/* 内容 */}
                    <Editor />
                </div>
            </div>
           
        </div>
    )
}

const mapStateToProps = state => ({
    study: state.study
  })

export default connect(mapStateToProps)(Study)