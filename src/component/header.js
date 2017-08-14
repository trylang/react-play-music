import React from 'react';
import {
	Row,
	Col,
	Icon
} from 'antd';


export default class Header extends React.Component {
	render() {
		return (
			<div >
				<Row>
					<Col offset={1} span={10}>
						<a href="/">
							<img src="./src/images/musicIcon.png" style={{width:"50px",heigth:"50px"}}/>
							<h3 style={{display:'inline-block'}}>React Player</h3>
						</a>
					</Col>
				</Row>
			</div>
		);
	}
};