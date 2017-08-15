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
	Card
} from 'antd';

const {
	Header,
	Footer,
	Sider,
	Content
} = Layout;

import Progress from './progress';

let cuerrentMusicItem = null;

export default class Contaner extends React.Component {
	constructor(props) {
		super(props),
			this.state = {
				dataItem: {
					name: '',
					label: ''
				},
				progress: 0,
				volume: 0,
				isPlay: true
			}
	}

	playFun(dataItem, target) {
		$("#player").jPlayer({
			ready: function(event) {
				$(this).jPlayer("setMedia", {
					title: "Scotty",
					mp3: dataItem.url,
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
			let currentTime = e.jPlayer.status.currentTime;
			let duration = e.jPlayer.status.duration;
			let progress = (currentTime / duration * 100).toFixed(2);
			console.log(currentTime / duration);
			target.setState({
				currentTime: currentTime,
				duration: duration,
				progress: progress
			});
		});
	};

	componentDidMount() {
		let url = `../localdb/list.json`;
		fetch(url, {
				method: 'GET'
			})
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					dataItem: json.data[4]
				});
			});

		$("#player").jPlayer({
			ready: function(event) {
				$(this).jPlayer("setMedia", {
					title: "Scotty",
					mp3: "http://m10.music.126.net/20170815235237/32fd94fa33c46d26ade7c1c5c784ee89/ymusic/87e7/3b39/cd12/8c93cbe60b0ec1ff9a8052b28a478aea.mp3",
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
			cuerrentMusicItem = e.jPlayer.status.duration;
			this.setState({
				volume: e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute
			});
		});
	}

	componentWillUnmount() {
		$("#player").unbind($.jPlayer.event.timeupdate);
	}

	changePro(pgs) {
		$("#player").jPlayer(this.state.isPlay ? "play" : "pause", cuerrentMusicItem * pgs);
	}

	setVolume(pgs) {
		$("#player").jPlayer('volume', pgs);
	}

	play() {
		$("#player").jPlayer(this.state.isPlay ? 'pause' : 'play');
		this.setState({
			isPlay: !this.state.isPlay
		});
	};

	changeAgain() {
		$("#player").jPlayer('play', 0);
	}

	render() {
		return (
			<div>
				<Row gutter={16}>
					<Col offset={5} span={8}>
						<Link to="/list">我的私人音乐坊 <Icon type="double-right" /></Link>
						
						<Card title={this.state.dataItem.label} bordered={false} style={{height:'170px',marginTop:'5px'}}>
						    <p>{this.state.dataItem.name}</p>
						    <div style={{marginBottom:"10px"}}>-{`3:39`} <Icon type="sound" className="playIcon playIcon-left"/>
						    <Progress style={{marginBottom:"8px"}}  setProgress={this.setVolume.bind(this)} progress={this.state.volume}  barColor='red'/></div>

						    <Progress  setProgress={this.changePro.bind(this)} progress={this.state.progress}  barColor='green'/>
						    <p style={{marginTop:'5px'}}>
						    	<Icon type="backward" className="playIcon"/>
						    	<Icon onClick={this.play.bind(this)} type={`${this.state.isPlay ? 'pause':'play'}-circle-o`} className="playIcon"/>
						    	<Icon type="forward" className="playIcon"/>
						    	<Icon type="retweet"  className="playIcon playIcon-rigth" onClick={this.changeAgain.bind(this)}/>
						    </p>
						</Card>
					</Col>
					<Col span={8}>
						<Card>
							<div className="custom-image">
						      <img alt="example" width="30%" height="30%" src={this.state.dataItem.imgSrc} />
						    </div>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
};