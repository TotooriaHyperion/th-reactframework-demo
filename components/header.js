/**
 * Created by Totooria Hyperion on 2016/10/5.
 */

"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Modal,Button,ButtonToolbar,DropdownButton,MenuItem } from 'react-bootstrap';
import MyForm from "../components/form";
import MyModal from "../components/modal";
import ajaxhelper from "../actions/ajaxhelper";
import constants from "../constants/constants";
//import logo_in from "../img/header.png";

import util from "../util/utility";


class ChangePwd extends Component {
	constructor(props,context) {
		super(props,context);
	}
	render() {
		let _this = this;
		return (
			<div className="clearfix editIt">
				<div className="p15">
					<MyForm.Input ref="oldPwd" formInfo={{title:"原始密码：",valueType:'number',textType:'password',required:true}}/>
					<MyForm.Input ref="newPwd" formInfo={{title:"新密码：",valueType:'number',textType:'password',required:true}}/>
				</div>
				<div className="thin-line mh0"></div>
				<p className="m0auto clearfix" style={{width:160}}>
					<button className="btn fr" onClick={_this.props.hide}>关闭</button>
					<button className="btn btn-yel fl" onClick={_this.changeit.bind(_this)}>修改密码</button>
				</p>
			</div>
		)
	}
	changeit() {
		let _this = this;
		let oldValue = ReactDOM.findDOMNode(this.refs['oldPwd'].refs.target).value;
		let newValue = ReactDOM.findDOMNode(this.refs['newPwd'].refs.target).value;
		let param = {
			mobilePhone:this.props.phone,
			password:oldValue,
			newPassword:newValue
		};
		let sendParam = {
			"ebk.ebkGetPassword":param
		};
		this.props.dispatch(ajaxhelper.put('http://' + constants.orderJSHost + "apiclient/user",sendParam,null,function(data) {
			return dispatch => {
				let _data = data["ebk.ebkGetPassword"];
				if (_data.isSuccess) {
					util.showToast('密码修改成功');
				} else {
					util.showToast('操作失败，原因是：' + _data.msg);
				}
				_this.props.hide();
			}
		}));
	}
}

const tokenKeyValue = {
	Admin:'admin',
	User:'user'
};

class Header extends Component {
	constructor(props) {
		super(props);
		//if(util.isEmptyObj(props.authed.userAuth)) {
		//	this.props.context.router.push("/");
		//}
	}
	componentWillMount() {
		// 第二次登录验证
		let authed = JSON.parse(sessionStorage.getItem("authed"))?JSON.parse(sessionStorage.getItem("authed")):{};
		if (!authed.expires_time || (authed.expires_time < (new Date()).getTime())) {
			this.props.context.router.push("/");
		} else {
			if(util.isEmptyObj(this.props.authed.currentUser)) {
				this.props.dispatch({
					type:'LOGIN_COMPLETE',
					data:authed
				});
			}
		}
		let currentPage = this.props.location.pathname.split("/")[1];
		if (tokenKeyValue[authed.userType] != currentPage) {
			this.props.context.router.push("/");
		}
	}
	render() {
		let _this = this;
		let { authed } = this.props;
		return (
			<div className="my-nav">
				<nav className="navbar" role="navigation">
					<div className="wrap clearfix">
						<div className="logo">
							<a href="javascript:;" onClick={_this.logout.bind(_this)}><img src="" alt=""/></a>
						</div>
						<ButtonToolbar className="fr normalfont dropdown">
							<DropdownButton bsStyle='link' title={authed.currentUser.userName || ""} id="0">
								<MenuItem eventKey="1" className={authed.currentUser.userType == 'Admin' ? 'dn' : ''} onClick={_this.changePwd.bind(_this)}>修改密码</MenuItem>
								<MenuItem eventKey="2" onClick={_this.logout.bind(_this)}>退出</MenuItem>
							</DropdownButton>
						</ButtonToolbar>
					</div>
				</nav>
				<MyModal ref="modal1" className="changePWD">
					<ChangePwd dispatch={_this.props.dispatch}/>
				</MyModal>
			</div>
		);
	}
	changePwd() {
		this.refs['modal1'].setState({
			phone:this.props.authed.currentUser.userName
		});
		this.refs['modal1'].show();
	}
	logout() {
		const _this = this;
		delete window.sessionStorage['authed'];
		delete window.sessionStorage['QiniuSum'];
		_this.props.context.router.push("/");
		_this.props.dispatch({type:"RESET_DATA"});
	}
}

function theState(state) {
	return {
		authed:state.authed
	}
}

Header.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(theState)(Header);

module.exports = ConnectApp;