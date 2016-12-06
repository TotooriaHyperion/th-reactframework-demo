/**
 * Created by Totooria Hyperion on 2016/10/19.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyForm from '../../../components/form';

import { EditUser } from "../../../actions/authed";

class ChangePwd extends Component {
	constructor(props,context) {
		super(props,context);
	}
	render() {
		let _this = this;
		let { type,userName } = _this.props;
		return (
			<div className="clearfix editIt">
				<div className="p15">
					<MyForm.Input ref="newUser" formInfo={{title: "UserName：",value:userName,popPos:'top',keepmsg:'Can not be empty',valueType:'number',textType:'text',required:true,readonly:!!userName}}/>
					<MyForm.Input ref="newPwd" formInfo={{title: "Password：",popPos:'top',keepmsg:'Can not be empty',valueType:'number',textType:'password',required:true}}/>
				</div>
				<div className="thin-line mh0"></div>
				<p className="m0auto clearfix" style={{width:180}}>
					<button className="btn fr" onClick={_this.props.hide}>Close</button>
					<button className="btn btn-yel fl" onClick={_this.changeit.bind(_this,type)}>Compolete</button>
				</p>
			</div>
		)
	}
	changeit(type) {
		let _this = this;
		let newValue = ReactDOM.findDOMNode(this.refs['newPwd'].refs.target).value;
		let userName = ReactDOM.findDOMNode(this.refs['newUser'].refs.target).value;
		let param = {
			userName:userName,
			pwd:newValue,
			type:type
		};
		this.props.actions.EditUser(param);
		_this.props.hide();
	}
}

ChangePwd.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

function state(state) {
	return {
		authed:state.authed
	};
}

function mapActions(dispatch) {
	return {
		actions:bindActionCreators({EditUser},dispatch),
		dispatch:dispatch
	}
}

let ConnectApp = connect(state,mapActions)(ChangePwd);

module.exports = ConnectApp;
