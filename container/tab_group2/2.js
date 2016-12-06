/**
 * Created by Totooria Hyperion on 2016/11/14.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import util from "../../util/utility";

//import '../../scss/single_tab1.scss';

class Tab2 extends Component {
	constructor(props,context) {
		super(props,context);
	}
	render() {
		let _this = this;
		return (
			<div style={{'minHeight':1000}}>
				<ol className="breadcrumb">
					<li className="">Admin</li>
					<li className="">TabGroup2</li>
					<li className="active">Tab2</li>
				</ol>
				<h1>I'm Tab 2</h1>
			</div>
		)
	}
}

Tab2.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(state => state)(Tab2);

module.exports = ConnectApp;
