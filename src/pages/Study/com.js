import React from 'react'
import { Input, Button } from 'antd';
import './com.less'

const HandleDir = ({confirm, cancel}) =>{
    const [value, setValue] = React.useState()
    return (
        <div className='createDir'>
            <Input placeholder="请输入目录名称" value={value} onChange={e=>setValue(e.target.value)}/>
            <div className='btns'>
                <Button type="primary" onClick={()=>confirm(value)}>确认</Button>
                <Button onClick={cancel}>取消</Button>
            </div>
        </div> 
    )
}

export{
    HandleDir
}