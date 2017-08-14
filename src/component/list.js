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
	Table,
	Input,
	Icon,
	Layout,
	Button,
	Popconfirm
} from 'antd';

const {
	Header,
	Footer,
	Sider,
	Content
} = Layout;

import Head from './header';


class EditableCell extends React.Component {
	// state = {
	// 	value: this.props.value,
	// 	editable: false,
	// }
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			editable: false,
		};
	}
	handleChange(e) {
		const value = e.target.value;
		this.setState({
			value
		});
	}
	check() {
		this.setState({
			editable: false
		});
		if (this.props.onChange) {
			this.props.onChange(this.state.value);
		}
	}
	edit() {
		this.setState({
			editable: true
		});
	}
	render() {
		const {
			value,
			editable
		} = this.state;
		return (
			<div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange.bind(this)}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check.bind(this)}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit.bind(this)}
              />
            </div>
        }
      </div>
		);
	}
}

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: 'label',
			dataIndex: 'label',
			width: '30%',
			render: (text, record, index) => (
				<EditableCell value={text} onChange={this.onCellChange(index, 'name')}/>
			),
		}, {
			title: 'name',
			dataIndex: 'name',
		}, {
			title: 'imgSrc',
			dataIndex: 'imgSrc',
		}, {
			title: 'url',
			dataIndex: 'url',
		}, {
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record, index) => {
				return (
					this.state.dataSource.length > 1 ?
					(
						<Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
              <a href="#">Delete</a>
            </Popconfirm>
					) : null
				);
			},
		}];

		this.state = {
			dataSource: [{
				key: '0',
				name: 'Edward King 0',
				age: '32',
				address: 'London, Park Lane no. 0',
			}, {
				key: '1',
				name: 'Edward King 1',
				age: '32',
				address: 'London, Park Lane no. 1',
			}],
			count: 2,
		};
	}


	componentWillMount() {
		let url = `../localdb/list.json`;
		let myHeaders = new Headers({
			"Content-Type": 'application/jsonp',
			"Accept": 'application/jsonp',
			"Origin": '*',
			"Access-Control-Allow-Origin": '*'
		});
		fetch(url, {
			method: 'GET'
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			this.setState({
				dataSource: data.data,
				count: data.data.length
			});
			console.log(this.state.dataSource);
			// alert(JSON.stringify(this.state.dataSource));
		}).catch(function(e) {
			console.log(e.message);
		})


	}


	onCellChange(index, key) {
		return (value) => {
			const dataSource = [...this.state.dataSource];
			dataSource[index][key] = value;
			this.setState({
				dataSource
			});
		};
	}
	onDelete(index) {
		const dataSource = [...this.state.dataSource];
		dataSource.splice(index, 1);
		this.setState({
			dataSource
		});
	}
	handleAdd() {
		const {
			count,
			dataSource
		} = this.state;
		const newData = {
			key: count,
			name: `Edward King ${count}`,
			age: 32,
			address: `London, Park Lane no. ${count}`,
		};
		this.setState({
			dataSource: [...dataSource, newData],
			count: count + 1,
		});
	}
	render() {
		const {
			dataSource
		} = this.state;
		console.log(this.state.dataSource);
		alert(JSON.stringify(this.state.dataSource));
		const columns = this.columns;
		alert(columns);
		return (
			<div>
        		<Layout>
					<Header style={{background:"#fff"}}><Head/></Header>
					<Layout>
						<Row>
							<Col span={20} offset={1} className="margin-top-10">
								<Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>Add</Button>
        						<Table bordered dataSource={dataSource} columns={columns} />
							</Col>
						</Row>
					</Layout>
					<Footer></Footer>
				</Layout>
      		</div>
		);
	}
}