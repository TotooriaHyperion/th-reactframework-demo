/**
 * Created by Totooria Hyperion on 2016/10/19.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

//import ajaxhelper from "../actions/ajaxhelper";
import util from "../util/utility";

import globalAction from "../actions/global";

import Header from "../components/header";
import Aside from "../components/aside";

class AdminWrap extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let _this = this;
		return (
			<div style={{'minHeight':1000}}>
				<Header name="User Name" context={_this.context} location={_this.props.location}/>
				<div className="wrap pos_re clearfix">
					<Aside cln="tree col-sm-2" context={_this.context} parentPath={_this.props.route.path} user="admin"/>
					<div className="col-sm-10 pl15 mymain">
						<ReactCSSTransitionGroup
							component="div"
							transitionName="example"
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
						>
							{_this.props.children && React.cloneElement(_this.props.children,{key: _this.props.location.pathname})}
						</ReactCSSTransitionGroup>
					</div>
				</div>
			</div>
		)
	}
}

AdminWrap.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(state => state)(AdminWrap);

module.exports = ConnectApp;