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
			dragMoving:false,
			isClick:true,
		};
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
		let {isDragging,dragMoving,defaultLeft,defaultTop} = _this.state;
		let {onStart,onDrag} = _this.props;
		if (!isDragging) {
			return;
		}

		let next = {
			left:(defaultLeft || 0) + e.clientX - _this.state.startLeft,
			top:(defaultTop || 0) + e.clientY - _this.state.startTop,
		};

		if (dragMoving) {
			(onDrag instanceof Function) && onDrag(next,e);
		} else {
			(onStart instanceof Function) && onStart({
				left:defaultLeft,
				top:defaultTop
			},e);
		}

		let pos = {
			...next,
			isClick:false,
			dragMoving:true
		};
		_this.setState(pos);
	}
	endDrag(e) {
		let _this = this;
		let { left,top,isClick } = _this.state;
		let { onStop } = _this.props;
		_this.setState({
			isDragging:false,
			dragMoving:false,
			isClick:false,
			defaultLeft:left,
			defaultTop:top
		},function () {
			if (!isClick) {
				(onStop instanceof Function) && onStop({left,top},e);
			}
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