/**
 * Created by Totooria Hyperion on 2016/9/30.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Button,ButtonToolbar,OverlayTrigger,Popover } from 'react-bootstrap';

function popoverHover(title,body) {
	return (
		<Popover id="popover-trigger-hover" title={title}>
			{body}
		</Popover>
	)
}

class ThButton extends Component {
	constructor(props) {
		super(props);
		let endTime = window.sessionStorage[props.theKey];
		let currentTime = (new Date()).getTime();
		let time = currentTime > endTime ? 0 : Math.ceil((endTime - currentTime)/1000);
		this.endTime = endTime;
		this.state = {
			isLoading: !!endTime && !!time,
			time:time,
		};
		this.handleClick = this.handleClick.bind(this);
		this.startCount = this.startCount.bind(this);
	}
	componentDidMount() {
		if (!!this.endTime && !!this.state.time) {
			this.startCount();
		}
	}
	componentWillUnmount() {
		clearInterval(this.cd);
	}
	render() {
		const { time,isLoading,...rest } = this.state;
		const { hoverTitle,hoverBody,popoverPlace,callback } = this.props;
		let _this = this;
		return (
			<ButtonToolbar>
				<OverlayTrigger trigger={['hover','focus']} placement={popoverPlace || "right"} overlay={popoverHover(hoverTitle || "",hoverBody || "")}>
					<Button {...rest} onClick={_this.handleClick} disabled={isLoading}>
						{isLoading ? ('还剩(' + time + ')秒') : _this.props.children}
					</Button>
				</OverlayTrigger>
			</ButtonToolbar>
		)
	}
	startCount() {
		let _this = this;
		_this.cd = setInterval(function () {
			if (_this.state.time == 1) {
				_this.setState({
					isLoading: false
				}, function () {
					clearInterval(_this.cd);
					delete _this.cd;
					delete window.sessionStorage[_this.props.theKey];
				});
			} else {
				_this.setState({
					time:_this.state.time - 1
				});
			}
		},1000);
	}
	handleClick() {
		let _this = this;
		window.sessionStorage[_this.props.theKey] = (new Date()).getTime() + _this.props.time * 1000;
		_this.props.callback();
		if (!_this.state.isLoading) {
			_this.setState({
				isLoading: true,
				time:_this.props.time
			});
		}
		_this.startCount();
	}
}
module.exports = ThButton;