/**
 * Created by Totooria Hyperion on 2016/10/19.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyModal from "../../components/modal";

import util from "../../util/utility";
import EditUser from './components/EditUser';

import { DeleteUser } from "../../actions/authed";

import '../../scss/user_manage.scss';

class UserManage extends Component {
	constructor(props,context) {
		super(props,context);
		this.newUser = this.newUser.bind(this);
	}
	newUser() {
		let _this = this;
		_this.refs['modal1'].setState({
			type:"user",
			userName:""
		}, function () {
			_this.refs['modal1'].show();
		});
	}
	render() {
		let _this = this;
		let { authed } = _this.props;
		return (
			<div style={{'minHeight':1000}}>
				<ol className="breadcrumb">
					<li className="">Admin</li>
					<li className="active">UserManage</li>
				</ol>
				<button className="btn btn-yel" onClick={_this.newUser}>New User</button>
				<table className={"table table-striped table-bordered table-hover"}>
					<thead>
					<tr>
						<th>User Name</th>
						<th>Password</th>
						<th>User Type</th>
						<th>Options</th>
					</tr>
					</thead>
					<tbody>
					{
						(function(users,admin){
							let count = 0;
							let ret = [];
							for(let key in admin) {
								ret.push((
									<tr key={count++}>
										<td>{key}</td>
										<td>{admin[key]}</td>
										<td>Admin</td>
										<td>
											<div className="col-sm-6">
												<button className="btn btn-default" onClick={_this.EditUser.bind(_this,'admin',key)}>Edit</button>
											</div>
											<div className="col-sm-6">
												<button className="btn btn-default" onClick={_this.DeleteUser.bind(_this,"admin",key)}>Delete</button>
											</div>
										</td>
									</tr>
								))
							}
							for(let key in users) {
								ret.push((
									<tr key={count++}>
										<td>{key}</td>
										<td>{users[key]}</td>
										<td>User</td>
										<td>
											<div className="col-sm-6">
												<button className="btn btn-default" onClick={_this.EditUser.bind(_this,'user',key)}>Edit</button>
											</div>
											<div className="col-sm-6">
												<button className="btn btn-default" onClick={_this.DeleteUser.bind(_this,"user",key)}>Delete</button>
											</div>
										</td>
									</tr>
								))
							}
							return ret;
						})(authed.user,authed.admin)
					}
					</tbody>
				</table>
				<MyModal ref="modal1">
					<EditUser />
				</MyModal>
			</div>
		)
	}
	EditUser(type,userName) {
		let _this = this;
		_this.refs['modal1'].setState({
			type,
			userName
		}, function () {
			_this.refs['modal1'].show();
		});
	}
	DeleteUser(type,userName) {
		let _this = this;
		_this.props.actions.DeleteUser({
			type,
			userName
		});
	}
}

UserManage.contextTypes = {
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
		actions:bindActionCreators({DeleteUser},dispatch),
		dispatch:dispatch
	}
}

let ConnectApp = connect(state,mapActions)(UserManage);

module.exports = ConnectApp;
