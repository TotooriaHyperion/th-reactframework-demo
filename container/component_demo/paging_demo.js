/**
 * Created by Totooria Hyperion on 2016/11/15.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import util from "../../util/utility";

import Paging from "../../components/UED_paging";

class PaginationDemo extends Component {
	constructor(props,context) {
		super(props,context);
		this.state = {
			page: 1,
			page_size: 10,
			totalPages: 5
		};
		this.doSearch = this.doSearch.bind(this);
	}
	doSearch(page) {
		let _this = this;
		let oldState = util.deepCopy(_this.state);
		let param = {
			page: page || 1
		};
		_this.setState(param, function () {
			console.log(param);
			//Todo Ajax/Fetch
			let success = true;
			if (!success) {
				// if failed, reset page.
				_this.setState(oldState);
			}
		});
	}
	render() {
		let _this = this;
		let { page,page_size,totalPages } = _this.state;
		return (
			<div style={{'minHeight':1000}}>
				<ol className="breadcrumb">
					<li className="">User</li>
					<li className="">Component Demo</li>
					<li className="active">Pagination Demo</li>
				</ol>
				<h1>I'm Pagination Demo</h1>
				<div className="paging_demo">
					<Paging
						page={page || 1}
						totalPage={totalPages}
						callback={function(newPage){_this.doSearch(newPage);}}
					/>
				</div>
			</div>
		)
	}
}

PaginationDemo.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(state => state)(PaginationDemo);

module.exports = ConnectApp;