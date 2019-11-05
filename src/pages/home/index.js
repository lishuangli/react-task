/*
 * @Descripttion: 
 * @Author: lishuangli
 * @Date: 2019-11-05 10:09:30
 * @LastEditors: lishuangli
 * @LastEditTime: 2019-11-05 21:33:14
 */
import React, { Fragment } from 'react';
import APP from '../../components/InputNumber';
import './index.less'


function Home() {
	return (
		<Fragment>
			<div className='wrap'>
				<h1>第六题</h1>
				<APP />
			</div>
			<div className='wrap'>
				<h1>第七题</h1>
				<div className='button'>Button</div>
			</div>
		</Fragment>
	)
}



export default Home;