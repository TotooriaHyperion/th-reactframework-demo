/**
 * Created by Totooria Hyperion on 2016/9/28.
 */

"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal,Button } from 'react-bootstrap';
import util from '../util/utility';

const propTypes = {
	title:PropTypes.string,
	size:PropTypes.string
};

const propMap = [];
for(let key in propTypes) {
	propMap.push(key);
}

class modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false,
			title:props.title || ''
		};
	}
	//componentWillReceiveProps(nextProps) {
	//	this.newProps = true;
	//	console.log('componentWillReceiveProps');
	//}
	//shouldComponentUpdate(nextProps, nextState) {
	//	//console.log(this.constructor.name + ' shouldComponentUpdate');
	//	//console.log(JSON.stringify(this.state));
	//	//console.log(JSON.stringify(nextState));
	//	const isPropsNew = this.newProps && !util.isPropsEqual(util.oneDepthCopy(this.props), util.oneDepthCopy(nextProps), [null]);
	//	//const isStateNew = JSON.stringifyForCircular(this.state) != JSON.stringifyForCircular(nextState);
	//	const isStateNew = JSON.stringifyForCircular(this.state) != JSON.stringifyForCircular(nextState);
	//	this.newProps = false;
	//	return (isPropsNew || isStateNew);
	//}
	render() {
		let _this = this;
		let { size,hideCallback } = this.props;
		let { title,show,...rest } = this.state;
		return (
			<Modal show={show} onHide={_this.hide.bind(_this,hideCallback)} bsSize={size} aria-labelledby={"contained-modal-title-" + size} className={_this.props.className}>
				<Modal.Header closeButton>
					<Modal.Title id={"contained-modal-title-" + size}>{this.props.title || title}</Modal.Title>
				</Modal.Header>
				<Modal.Body className="clearfix ph0">
					{this.props.children && React.cloneElement(this.props.children, {...rest,exportData:_this.exportData,hide:_this.hide.bind(_this)})}
				</Modal.Body>
			</Modal>
		);
	}
	exportData(data) {
		this.setState({
			modalInfo:data
		});
	}
	show() {
		this.setState({
			show:true
		});
	}
	hide(callback) {
		if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
			callback();
		}
		this.setState({
			show:false
		});
	}
}

modal.propTypes = propTypes;

module.exports = modal;