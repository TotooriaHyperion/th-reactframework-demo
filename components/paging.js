/**
 * Created by Totooria Hyperion on 2016/10/14.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import util from "../util/utility";

import { Pagination } from 'react-bootstrap';

function getInitialState(props,state) {
	let ret = {
		page:props.page
	};
	return ret;
}

function	changePage(callback,eventKey,e) {
	let newPage;
	if (eventKey) {
		newPage = eventKey;
	} else {
		if(e.type == 'keyup') {
			if(e.keyCode == 13) {
				newPage = ReactDOM.findDOMNode(this.refs.ipt).value;
			} else {
				return;
			}
		} else {
			newPage = 1;
		}
	}
	if(isNaN(parseInt(newPage)) || newPage > this.props.totalPage) {
		return util.showToast("请输入正确的页码（小于最大页数的数字）");
	}
	this.setState({
		page:Number(newPage)
	});
	callback && callback(newPage);
}

class Paging extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState(props,this.state);
		this.changePage = changePage.bind(this,props.callback);
	}
	componentWillReceiveProps(nextProps) {
		this.setState(getInitialState(nextProps,this.state));
		this.changePage = changePage.bind(this,nextProps.callback);
	}
	componentDidUpdate() {
		ReactDOM.findDOMNode(this.refs.ipt).value = this.state.page || 1;
	}
	render() {
		let _this = this;
		let { page } = _this.state;
		let { totalPage,maxButtons } = _this.props;
		return (
			<div className="clearfix">
				<p className={"fr pagination " + (totalPage > 1 ? "" : "dn")} style={{lineHeight:"34px"}}>页,共{totalPage || 1}页</p>
				<input
					ref="ipt"
					className={"fr pagination text-center mh10 p0 form-control " + (totalPage > 1 ? "" : "dn")}
					style={{width:40}}
					type="text"
					onKeyUp={_this.changePage.bind(_this,null)}
				/>
				<p className={"fr pagination ml20 " + (totalPage > 1 ? "" : "dn")} style={{lineHeight:"34px"}}>第</p>
				<Pagination
					className={"fr " + (totalPage > 1 ? "" : "dn")}
					prev
					next
					first
					last
					ellipsis
					boundaryLinks
					items={totalPage}
					maxButtons={maxButtons}
					activePage={page}
					onSelect={_this.changePage}
				/>
			</div>
		)
	}
}

module.exports = Paging;