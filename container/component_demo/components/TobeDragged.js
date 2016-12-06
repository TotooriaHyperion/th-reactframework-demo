/**
 * Created by Totooria Hyperion on 2016/12/5.
 */
"use strict";

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Draggable from "../../../overlays/draggable";
import Ded from "./TestComp";
import {Modal} from "react-bootstrap";

import "../../../scss/component_demo.scss";

class Dragged extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			show: false
		};
		this.getDragTarget = this.getDragTarget.bind(this);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.test = this.test.bind(this);
	}

	test(e) {
		console.log(e.nativeEvent);
	}

	show() {
		this.setState({
			show: true
		});
	}

	hide() {
		this.setState({
			show: false
		});
	}
	render() {
		let _this = this;
		let {show} = _this.state;
		return (
				<Modal ref="modal"
						 show={show}
						 dialogComponentClass={Draggable}
						 onStart={function (p,e) {
							 console.log("Start drag at:" + JSON.stringify(p));
						 }}
						 onDrag={function (p,e) {
							 console.log("Dragging:" + JSON.stringify(p));
						 }}
						 onStop={function (p,e) {
							 console.log("Stop drag at:" + JSON.stringify(p));
						 }}
						 className="modal dialogTest"
						 backdrop={false}
						 draggedClassName="modal-content drag1"
						 target={() => _this.refs["modalheader"]}>
					<Modal.Header onHide={_this.hide} closeButton>
						<Modal.Title ref="modalheader" id={"contained-modal-title-"} style={{"cursor": "pointer"}}>Hahaha Draggable Demo</Modal.Title>
					</Modal.Header>
					<Modal.Body ref="modalbody" className="clearfix p15">
						<div style={{width: 200, height: 200}}>
							<h2 ref="target" style={{"cursor": "pointer"}} onClick={this.test}>Drag Target</h2>
							I'm dragged component!
						</div>
					</Modal.Body>
					<Modal.Footer ref="modalfooter">
						<button className="btn btn-yel" onClick={_this.hide}>关闭</button>
					</Modal.Footer>
				</Modal>
		)
	}

	getDragTarget() {
		return this.refs["target"];
	}
}

let ConnectApp = connect(state => state, null, null, {withRef: true})(Dragged);

export default ConnectApp;