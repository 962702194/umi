import React from 'react'
import './Index.less'

export default class Modal extends React.Component{
    render=()=>{
        const {isShow, children} = this.props
        if(!isShow) return null 
        return (
            <div className='modal'>
                {children}
            </div>
        )
    }
}