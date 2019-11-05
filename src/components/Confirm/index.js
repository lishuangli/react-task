/*
 * @Descripttion: 
 * @Author: lishuangli
 * @Date: 2019-11-05 21:57:44
 * @LastEditors: lishuangli
 * @LastEditTime: 2019-11-05 22:41:11
 */
import React, { Component } from 'react';
import './index.less';

class Confirm extends Component {

  constructor() {
    super();
    this.state = {
      mag: ''
    }
  }

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



class App extends Confirm {

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

export default App;