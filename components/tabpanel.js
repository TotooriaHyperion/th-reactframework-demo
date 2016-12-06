/**
 * Created by Totooria Hyperion on 2016/9/30.
 */
"use strict";
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {} from 'react-bootstrap';


class ThTabPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showNo:0
		}
	}
	render() {
		let _this = this;
		const { showNo } = this.state;
		return (
			<div>
				<ul className="clearfix">
					{this.props.children.map(function (item,index) {
						return (
							<li key={index} className={showNo == index ? 'active' : ''} onClick={_this.toggleTab.bind(_this,index)} style={{cursor:'pointer',float:'left',marginRight:'20px',padding:'10px 10px'}}>{item.props.title}</li>
						)
					})}
				</ul>
				<div>
					{this.props.children.map(function (item,index) {
						if(showNo != index) {
							return null;
						}
						return (
							<div key={index} className={showNo == index ? 'show' : 'hide'}>{item}</div>
						)
					})}
				</div>
			</div>
		)
	}
	toggleTab(index) {
		let _this = this;
		(_this.props.beforeShow instanceof Function) && _this.props.beforeShow(index);
		_this.setState({
			showNo:index
		}, function () {
			(_this.props.afterShow instanceof Function) && _this.props.afterShow(index);
		});
	}
}
module.exports = ThTabPanel;