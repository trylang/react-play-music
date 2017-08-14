import React from 'react';

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
	Layout,
	Card,
	Progress
} from 'antd';

const {
	Header,
	Footer,
	Sider,
	Content
} = Layout;

function formatter(value) {
	return `${value}%`;
}

export default class Contaner extends React.Component {
	render() {
		return (
			<div >
				<Row gutter={16}>
					<Col offset={5} span={8}>
						<Link to="/list">我的私人音乐坊 <Icon type="double-right" /></Link>
						<Card title="天使中的魔鬼" bordered={false} style={{height:'170px',marginTop:'5px'}}>
						    <p>薛之谦</p>
						    <p>-{`3:39`} <Icon type="sound" className="playIcon playIcon-left"/></p>
						    <Progress percent={50} status="active" strokeWidth={3} />
						    <p style={{marginTop:'5px'}}>
						    	<Icon type="backward" className="playIcon"/>
						    	<Icon type="pause-circle-o" className="playIcon"/>
						    	<Icon type="play-circle-o" className="playIcon"/>
						    	<Icon type="forward" className="playIcon"/>
						    	<Icon type="retweet" className="playIcon playIcon-rigth"/>
						    </p>
						</Card>
					</Col>
					<Col span={8}>
						<Card>
							<div className="custom-image">
						      <img alt="example" width="30%" height="30%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
						    </div>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
};