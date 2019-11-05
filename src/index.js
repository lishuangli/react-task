/*
 * @Descripttion: 
 * @Author: lishuangli
 * @Date: 2019-11-05 10:09:33
 * @LastEditors: lishuangli
 * @LastEditTime: 2019-11-05 20:45:26
 */
import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home';
import './index.less';


const BasicExample = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
);


ReactDOM.render(
    <BasicExample />,
    document.getElementById('root')
)


if(module.hot) {
    module.hot.accept();
}
