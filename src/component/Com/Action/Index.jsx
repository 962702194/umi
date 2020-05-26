import React from 'react'
import { Input, Button } from 'antd';
import './Index.less'

const action = {
    'upload': '请输入目标目录',
    'create': '请输入新建目录',
    'rename': '请输入重命名',
    'delete': '请输入删除目录'
}

const HandleDir = ({confirm, cancel, option, rename}) =>{
    const [value, setValue] = React.useState()
    const [oldName, setOldName] = React.useState(rename)
    return (
        <div className='createDir'>
            {
                option === 'rename'
                ? <Input placeholder='请输入旧名称' value={oldName} onChange={e=>setOldName(e.target.value)}/>
                : null
            }
            <Input placeholder={action[option]} value={value} onChange={e=>setValue(e.target.value)}/>
            <div className='btns'>
                <Button type="primary" onClick={()=>confirm(value, oldName)}>确认</Button>
                <Button onClick={cancel}>取消</Button>
            </div>
        </div> 
    )
}

export default HandleDir
