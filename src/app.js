'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Router,
	Route,
	HashRouter,
	Match,
	hashHistory,
	IndexLink,
	Link
} from 'react-router-dom';
import {
	Row,
	Col,
	Icon,
	Layout
} from 'antd';

const {
	Header,
	Footer,
	Sider,
	Content
} = Layout;

import Index from './component/index';
import List from './component/list';

export default class App extends React.Component {
	render() {
		return (
			<HashRouter history={hashHistory}>
			  <div>
			    <Route exact path="/" component={Index}/>
			    <Route path="/list" component={List}/>
			  </div>
			</HashRouter>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));