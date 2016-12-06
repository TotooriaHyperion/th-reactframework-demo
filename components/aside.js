/**
 * Created by Totooria Hyperion on 2016/10/5.
 */

"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { PanelGroup,Panel } from 'react-bootstrap';

const lists = {
	'admin':[
		{
			listName:'User Manage',
			path:'user_manage'
		},
		{
			listName:'Tab Group 1',
			list:[
				{name:'Group 1 Tab 1',path:'g1tab1'},
				{name:'Group 1 Tab 2',path:'g1tab2'},
				{name:'Group 1 Tab 3',path:'g1tab3'},
			]
		},
		{
			listName:'Single Tab 1',
			path:'tab1'
		},
		{
			listName:'Tab Group 2',
			list:[
				{name:'Group 2 Tab 1',path:'g2tab1'},
				{name:'Group 2 Tab 2',path:'g2tab2'},
				{name:'Group 2 Tab 3',path:'g2tab3'},
			]
		},
	],
	'user':[
		{
			listName:'Components ',
			list:[
				{name:'Form',path:'form_demo'},
				{name:'Form Tool',path:'form_tool_demo'},
				{name:'Modal',path:'modal_demo'},
				{name:'Pagination',path:'paging_demo'},
				{name:'Time Button',path:'time_button_demo'},
				{name:'Calendar',path:'calendar_demo'},
				{name:'Draggable',path:'draggable_demo'},
			]
		},
	]
};

class CustomHeader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<span onClick={this.props.handleSelect}>
				{this.props.text}
				{this.props.isGroup ? (<span className={"glyphicon glyphicon-triangle-bottom fr " + (this.props.expanded ? 'active' : '')} />) : null}
			</span>
		)
	}
}

function getInitialState(props) {
	let path = props.routing.locationBeforeTransitions.pathname.split("/");
	let user = path[1];
	let page = path[2];
	if (user == "") {
		return {
			expandedPanel:0,
			activePanel:0,
			activeList:0
		};
	}
	let curList = lists[user];
	let flag = false;
	let expandedPanel = 0,activePanel = 0,activeList = 0;
	for(let i=0;i<curList.length;i++) {
		let cur = curList[i];
		if (cur.list && cur.list.length) {
			for(let j=0;j<cur.list.length;j++) {
				if (cur.list[j].path == page) {
					expandedPanel = i;
					activePanel = i;
					activeList = j;
					flag = true;
					break;
				}
			}
			if (flag) {
				break;
			}
		} else {
			if (cur.path == page) {
				expandedPanel = i;
				activePanel = i;
				flag = true;
				break;
			}
		}
	}
	return {
		expandedPanel:expandedPanel,
		activePanel:activePanel,
		activeList:activeList
	};
}

class Aside extends Component {
	constructor(props) {
		super(props);

		this.state = getInitialState(props);
	}
	componentWillReceiveProps(nextProps) {
		this.setState(getInitialState(nextProps));
	}
	render() {
		let _this = this;
		let { user,cln } = this.props;
		let { activePanel,activeList } = this.state;
		let curLists = lists[user];
		//curLists = lists['weshare'];
		return (
			<PanelGroup ref="group" activeKey={_this.state.expandedPanel} className={cln} accordion>
				{
					curLists.map(function (list,index) {
						if (list.path) {
							return (
								<Panel ref={'panel' + index} className={activePanel == index ? 'active' : ''} header={<CustomHeader text={list.listName} isGroup={false} expanded={_this.state.expandedPanel == index} handleSelect={_this.handleSelect.bind(_this,index)}/>} key={index} eventKey={index} onClick={_this.linkTo.bind(_this,list.path,index,null)}/>
							)
						} else {
							return (
								<Panel ref={'panel' + index} className={activePanel == index ? 'active' : ''} header={<CustomHeader text={list.listName} isGroup={true} expanded={_this.state.expandedPanel == index} handleSelect={_this.handleSelect.bind(_this,index)}/>} key={index} eventKey={index} onClick={_this.toggleGlyph}>
									<ul>
										{
											list.list.map(function (item,subIndex) {
												return (
													<li className={item.className + ' ' + ((activeList == subIndex && activePanel == index) ? 'active' : '')} key={subIndex}  onClick={_this.linkTo.bind(_this,item.path,index,subIndex)}>{item.name}</li>
												)
											})
										}
									</ul>
								</Panel>
							)
						}
					})
				}
			</PanelGroup>
		);
	}
	handleSelect(key) {
		this.setState({
			expandedPanel:key == this.state.expandedPanel ? null : key
		});
	}
	linkTo(path,index,subIndex,e) {
		e.stopPropagation();
		this.setState({
			activePanel:index,
			activeList:subIndex
		});
		if (path != null) {
			this.props.context.router.push("/" + this.props.user + "/" + path);
		}
	}
}

Aside.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(state => state)(Aside);

module.exports = ConnectApp;