import React from 'react';

import {
	BrowserRouter,
	Router,
	Route,
	Link
} from 'react-router-dom';
import Pubsub from 'pubsub-js';
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
		super(props);
		this.state = {
			dataItem: this.props.currentItem1,
			progress: 0,
			volume: 0,
			isPlay: true,
			ifShow1: true,
			ifShow2: false,
			ifShow3: false,
			musicList: this.props.dataSource1
		}
	}

	componentDidMount() {
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

	changeAgain(type) {
		if (type == 'retweet') {
			$("#player").jPlayer('play', 0);
			this.setState({
				ifShow1: false,
				ifShow2: true,
				ifShow3: false
			});
		} else if (type == 'menu-unfold') {
			$("#player").jPlayer({
				repeat: function(event) {
					console.log(event.jPlayer.options.loop)
					if (event.jPlayer.options.loop) {
						$(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
							$(this).jPlayer("play");
						});
					} else {
						$(this).unbind(".jPlayerRepeat");
					}
				},
				loop: true
			});
			this.setState({
				ifShow1: false,
				ifShow2: false,
				ifShow3: true
			});
		} else if (type == 'swap') {
			this.setState({
				ifShow1: true,
				ifShow2: false,
				ifShow3: false
			});
		}
	};

	playBack(data) {
		Pubsub.publish('BACK_MUSIC', data);
	};

	playForward(data) {
		Pubsub.publish('FORWARD_MUSIC', data);
	};


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
						    	<Icon type="backward" className="playIcon" onClick={this.playBack.bind(this,this.state.dataItem)}/>
						    	<Icon type={`${this.state.isPlay ? 'pause':'play'}-circle-o`} className="playIcon" onClick={this.play.bind(this)} />
						    	<Icon type="forward" className="playIcon" onClick={this.playForward.bind(this,this.state.dataItem)}/>
						    	<Icon type="retweet"  className="playIcon playIcon-rigth" style={{display:`${this.state.ifShow1? 'block':'none'}`}} onClick={this.changeAgain.bind(this,'retweet')}/> 
						    	<Icon type="menu-unfold" className="playIcon playIcon-rigth" style={{display:`${this.state.ifShow2? 'block':'none'}`}} onClick={this.changeAgain.bind(this,'menu-unfold')}/>
						    	<Icon type="swap" className="playIcon playIcon-rigth" style={{display:`${this.state.ifShow3? 'block':'none'}`}} onClick={this.changeAgain.bind(this,'swap')}/>
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