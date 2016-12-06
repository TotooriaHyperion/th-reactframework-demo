/**
 * Created by Totooria Hyperion on 2016/11/15.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import util from "../../util/utility";

import TimeButton from "../../components/timebtn";

class TimeButtonDemo extends Component {
	constructor(props,context) {
		super(props,context);
		this.state = {};
		this.doSync = this.doSync.bind(this);
	}
	doSync() {
		alert("Do Something");
	}
	render() {
		let _this = this;
		return (
			<div style={{'minHeight':1000}}>
				<ol className="breadcrumb">
					<li className="">User</li>
					<li className="">Component Demo</li>
					<li className="active">Time-Button Demo</li>
				</ol>
				<h1>I'm Time-Button Demo</h1>
				<div className="timebtn_demo">
					<TimeButton callback={_this.doSync} time="10" hoverTitle="" hoverBody="10 sec per click" theKey={_this.props.location.pathname + "0"}>
						Do Something
					</TimeButton>
				</div>
			</div>
		)
	}
}

TimeButtonDemo.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(state => state)(TimeButtonDemo);

module.exports = ConnectApp;