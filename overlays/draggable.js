/**
 * Created by Totooria Hyperion on 2016/12/5.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Draggable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultLeft:props.defaultLeft || 0,
			defaultRight:props.defaultTop || 0,
			left:props.defaultLeft || 0,
			top:props.defaultTop || 0,
			isDragging:false,
			isClick:true,
		};
		this.test = this.test.bind(this);
		this.startDrag = this.startDrag.bind(this);
		this.dragMove = this.dragMove.bind(this);
		this.endDrag = this.endDrag.bind(this);
		this.registerEvent = this.registerEvent.bind(this);
	}
	componentWillUnmount() {
		let _this = this;
		let dragTarget = _this.props.target();
		let domNode = ReactDOM.findDOMNode(dragTarget);
		domNode.removeEventListener("mousedown",_this.startDrag);
		document.removeEventListener("mousemove",_this.dragMove);
		document.removeEventListener("mouseup",_this.endDrag);
	}
	componentDidMount() {
		this.registerEvent();
	}
	registerEvent() {
		let dragTarget = this.props.target();
		let node = ReactDOM.findDOMNode(dragTarget);
		node.addEventListener("mousedown",this.startDrag);
		document.addEventListener("mousemove",this.dragMove);
		document.addEventListener("mouseup",this.endDrag);
	}
	startDrag(e) {
		this.setState({
			isDragging:true,
			isClick:true,
			startLeft:e.clientX,
			startTop:e.clientY
		});
	}
	dragMove(e) {
		let _this = this;
		if (!_this.state.isDragging) {
			return;
		}
		let pos = {
			left:(_this.state.defaultLeft || 0) + e.clientX - _this.state.startLeft,
			top:(_this.state.defaultTop || 0) + e.clientY - _this.state.startTop,
			isClick:false
		};
		_this.setState(pos);
	}
	endDrag(e) {
		this.setState({
			isDragging:false,
			defaultLeft:this.state.left,
			defaultTop:this.state.top
		});
	}
	render() {
		let _this = this;
		let { className,draggedClassName,...rest } = _this.props;
		let { left,top,isClick } = _this.state;
		return (
			<div className={className}>
				<div className="modal-dialog" style={{"position":"relative"}}>
					<div style={{"position":"absolute",width:0,height:0,left:left + "px",top:top + "px"}}>
						<div className={draggedClassName}>
							{/*{_this.props.children && React.cloneElement(_this.props.children,rest)}*/}
							{_this.props.children}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Draggable;