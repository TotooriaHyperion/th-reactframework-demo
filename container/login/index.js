/**
 * Created by Totooria Hyperion on 2016/10/9.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from "react-router";
import MyForm from "../../components/form";
import MyModal from "../../components/modal";

import { doLogin } from "../../actions/authed";
import util from "../../util/utility";
//import ajaxhelper from "../../actions/ajaxhelper";

//class ForgotPwd extends Component {
//	constructor(props,context) {
//		super(props,context);
//	}
//	render() {
//		return (
//			<div></div>
//		)
//	}
//}

class Login extends Component {
	constructor(props,context) {
		super(props,context);
	}
	render() {
		let _this = this;
		return (
			<div style={{'minHeight':1000}}>
				<div className="login">
					<div className="container">
						<div className="jumbotron">
							<h3 className="text-center"><img src="" alt=""/></h3>
							<form role="form" id="loginIt" autoComplete="off">
								<div className="inputArea">
									<input type="text" ref="userName" className="form-control" placeholder="请输入手机号码" />
									<input type="password" ref="passWord" className="form-control" placeholder="请输入密码" />
								</div>
								{
									//<p className="forgetPass" onClick={_this.forgetPWD.bind(_this)}>忘记密码？</p>
								}
								<p className="text-left"><b data-location="" className="btn" id="i_submit" onClick={_this.doLogin.bind(_this)}>登录</b></p>
								<a href="#myModal"  className="disnone" id="i_login_warn" data-toggle="modal">
								</a>
							</form>
						</div>
					</div>
				</div>
				<MyModal ref="modal2">
					{
						//<ForgotPwd dispatch={_this.props.dispatch}/>
					}
				</MyModal>
			</div>
		)
	}
	//forgetPWD() {
	//	this.refs['modal2'].show();
	//}
	doLogin() {
		let _this = this;
		let userName = _this.refs['userName'].value;
		let pwd = _this.refs['passWord'].value;
		_this.context.store.dispatch(doLogin(userName,pwd,_this.context));
	}
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

function state(state) {
	return {
		authed:state.authed
	};
}

let ConnectApp = connect(state)(Login);

module.exports = ConnectApp;