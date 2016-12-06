/**
 * Created by Totooria Hyperion on 2016/12/5.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import util from "../../util/utility";
import TobeDragged from "./components/TobeDragged";

class DraggableDemo extends Component {
	constructor(props) {
		super(props);
		this.showModal = this.showModal.bind(this);
	}
	showModal(name) {
		let _this = this;
		_this.refs[name].refs["wrappedInstance"].show();
	}
	render() {
		return (
			<div style={{'minHeight':1000}}>
				<ol className="breadcrumb">
					<li className="">User</li>
					<li className="">Component Demo</li>
					<li className="active">Draggable Demo</li>
				</ol>
				<h1>I'm Draggable Demo</h1>
				<button className="btn btn-yel" onClick={this.showModal.bind(null,"modal1")}>Show Draggable Modal</button>
				<TobeDragged ref="modal1" />
			</div>
		)
	}
}

// export default DraggableDemo;
module.exports = DraggableDemo;