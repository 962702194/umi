import React from 'react'
import router from 'umi/router';
import './index.less'


const Index = () =>{
    return (
        <div className='app'>
            <div className='appTitleList'>
                <h2>个人网站</h2>
                <p onClick={()=>router.push('/study')}>>>学习日志</p>
                <p onClick={()=>console.log('暂无功能')}>>>demo</p>
            </div>
        </div>
    )
}

export default Index