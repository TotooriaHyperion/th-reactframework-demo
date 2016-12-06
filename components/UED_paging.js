/**
 * Created by Totooria Hyperion on 2016/10/16.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import util from "../util/utility";

import { Button } from 'react-bootstrap';

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
				try {
					newPage = Number(ReactDOM.findDOMNode(this.refs.ipt).value);
				} catch (e) {
					newPage = 1;
				}
			} else {
				return;
			}
		} else {
			newPage = 1;
		}
	}
	if(isNaN(parseInt(newPage)) || newPage > this.props.totalPage) {
		util.showToast("请输入正确的页码（小于最大页数的数字）");
		this.setState({
			page:Number(this.state.page)
		});
	} else {
		if(newPage == this.state.page) {
			return;
		}
		this.setState({
			page:Number(newPage)
		});
		callback && callback(newPage);
	}
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
		ReactDOM.findDOMNode(this.refs.ipt).value = this.state.page;
	}
	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.ipt).value = this.state.page;
	}
	render() {
		let _this = this;
		let { page } = _this.state;
		let { totalPage,maxButtons } = _this.props;
		return (
			<div className={"clearfix " + (totalPage > 1 ? "" : "dn")}>
				<p className={"fr pagination " + (totalPage > 1 ? "" : "dn")} style={{lineHeight:"34px"}}>页,共{totalPage || 1}页</p>
				<input
					ref="ipt"
					className={"fr pagination text-center mh10 p0 form-control " + (totalPage > 1 ? "" : "dn")}
					style={{width:40}}
					type="text"
					onKeyUp={_this.changePage.bind(_this,null)}
				/>
				<p className={"fr pagination ml20 " + (totalPage > 1 ? "" : "dn")} style={{lineHeight:"34px"}}>第</p>
				<Button className="fr pagination " onClick={_this.changePage.bind(_this,totalPage)}>尾页</Button>
				<Button className="fr pagination " onClick={_this.changePage.bind(_this,page == totalPage ? page : page + 1)}>下一页</Button>
				<Button className="fr pagination " onClick={_this.changePage.bind(_this,page == 1 ? 1 : page - 1)}>上一页</Button>
				<Button className="fr pagination " onClick={_this.changePage.bind(_this,1)}>首页</Button>
			</div>
		)
	}
}

module.exports = Paging;