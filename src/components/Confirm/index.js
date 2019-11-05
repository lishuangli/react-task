/*
 * @Descripttion: 
 * @Author: lishuangli
 * @Date: 2019-11-05 21:57:44
 * @LastEditors: lishuangli
 * @LastEditTime: 2019-11-05 22:43:31
 */
import React, { Component } from 'react';
import './index.less';


class Confirm extends ConfirmComponent {

  async componentDidMount(){
    const confirm = this.info
    let res = await confirm("确定删除吗")
    if(res) {
        console.log("是")
    } else {
        console.log("否")
    }
}
  render() {
    return super.render()
  }
}



class ConfirmComponent extends Component {

  constructor() {
    super();
    this.state = {
      mag: ''
    }
  }

  // 不会写了, 编不出来了
  info = (v) => {
    this.setState({
      msg: v
    })
  }
  

  render() {
    const { msg } = this.state;
    return (
      <div className='confirm-wrap'>
        <div className='content'>{msg}</div>
        <div className='button'>是</div>
        <div className='button'>否</div>
      </div>
    )
  }
}

export default Confirm;

