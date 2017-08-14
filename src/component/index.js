'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import {
	BrowserRouter,
	Router,
	Route,
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

import Head from './header';
import Container from './container';

export default class Index extends React.Component {
	render() {
		return (
			<div>
				<Layout>
					<Header style={{background:"#fff"}}><Head/></Header>
					<Layout>
						<Content style={{background:"#eee",paddingTop:"10%",paddingBottom:"5%"}}>
							<Container/>
						</Content>
					</Layout>
					<Footer></Footer>
				</Layout>
			</div>
		)
	}
}