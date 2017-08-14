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
	constructor(props) {
		super(props),
			this.state = {
				progress: 0,
				currentTime: 0,
				duration: 0
			}
	}

	componentDidMount() {
		$("#player").jPlayer({
			ready: function(event) {
				$(this).jPlayer("setMedia", {
					title: "Scotty",
					mp3: "http://m10.music.126.net/20170814193000/c23570e8b0822f00d92aec0634e7ce44/ymusic/27a0/4b16/7f9a/04eb12d35c0776f26d37d165ab46ef87.mp3"
				}).jPlayer('play');
			},
			swfPath: "../../node_modules/jplayer/dist/jplayer", // jquery.jplayer.swf 文件存放的位置
			supplied: "mp3",
			wmode: "window", // 设置Flash 的wmode，具体设置参见文档说明，写window 就好了
			useStateClassSkin: true, // 默认情况下，播放和静音状态下的dom 元素会添加class jp-state-playing, jp-state-muted 这些状态会对应一些皮肤，是否使用这些状态对应的皮肤。
			autoBlur: false, // 点击之后自动失去焦点
			smoothPlayBar: true, // 平滑过渡
			keyEnabled: true, // 是否允许键盘控制播放
			remainingDuration: true, // 是否显示剩余播放时间,如果为false 那么duration 那个dom显示的是【3:07】,如果为true 显示的为【-3:07】
			toggleDuration: true //允许点击剩余时间的dom 时切换 剩余播放时间的方式，比如从【3:07】点击变成【-3：07】如果设置为false ,那么点击无效，只能显示remainingDuration 设置的方式。
		});

		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			console.log(e);
			let currentTime = e.jPlayer.status.currentTime;
			let duration = e.jPlayer.status.duration;
			let progress = Math.round(currentTime / currentTime * currentTime);
			this.setState({
				currentTime: currentTime,
				duration: duration,
				progress: progress
			});
		});

	}
	render() {
		return (
			<div>
				<Row gutter={16}>
					<Col offset={5} span={8}>
						<Link to="/list">我的私人音乐坊 <Icon type="double-right" /></Link>
						<Card title="天使中的魔鬼" bordered={false} style={{height:'170px',marginTop:'5px'}}>
						    <p>薛之谦</p>
						    <p>-{`3:39`} <Icon type="sound" className="playIcon playIcon-left"/></p>
						    
						    <Progress percent={this.state.progress} format={percent => `${percent}`} status="active" strokeWidth={3} />
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