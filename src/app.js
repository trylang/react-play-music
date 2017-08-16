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

import Pubsub from 'pubsub-js';

import Index1 from './component/index';
import MusicList from './component/list';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			musicList: [],
			currentItem: []
		};
	}

	componentDidMount() {
		function play(data) {
			$('#player').jPlayer('setMedia', {
				mp3: data.url
			}).jPlayer('play');
		};

		let url = `../localdb/list.json`;
		fetch(url, {
				method: 'GET'
			})
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					musicList: json.data,
					currentItem: json.data[4]
				})
			});

		Pubsub.subscribe('SELECT_MUSIC', (msg, musicItem) => {
			this.setState({
				currentItem: musicItem
			})
		});
		Pubsub.subscribe('BACK_MUSIC', (msg, musicItem) => {
			let listAry = this.state.musicList;
			let index = listAry.indexOf(musicItem);
			let backObj = listAry[index - 1];
			backObj = listAry.includes(backObj) ? backObj : listAry[listAry.length - 1];
			this.setState({
				currentItem: backObj
			})
			play(backObj);
		});
		Pubsub.subscribe('FORWARD_MUSIC', (msg, musicItem) => {
			let listAry = this.state.musicList;
			let index = listAry.indexOf(musicItem);
			let forObj = listAry[index + 1];
			forObj = listAry.includes(forObj) ? forObj : listAry[0];
			this.setState({
				currentItem: forObj
			})
			play(forObj);
		});
	}

	render() {
		function playFun(data, target) {
			$("#player").jPlayer({
				ready: function(event) {
					$(this).jPlayer("setMedia", {
						title: data.name,
						mp3: data.url
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
		};
		if (this.state.musicList.length > 0) {
			playFun(this.state.currentItem, this);
		}
		const List = () => (
			<MusicList musicList={this.state.musicList} currentItem={this.state.currentItem}/>
		)
		const Index = () => (
			<Index1 musicList={this.state.musicList} currentItem={this.state.currentItem}/>
		)
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