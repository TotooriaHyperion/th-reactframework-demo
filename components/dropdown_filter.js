/**
 * Created by Totooria Hyperion on 2016/10/26.
 */
"use strict";
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { FormControl,Dropdown,MenuItem } from 'react-bootstrap';

class DropDownWithFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter:''
		};
		this.handleChange = this.handleChange.bind(this);
		this.focusFilter = this.focusFilter.bind(this);
	}
	handleChange(e) {
		this.setState({
			filter:ReactDOM.findDOMNode(e.target).value
		});
	}
	focusFilter(e) {
		let _this = this;
		setTimeout(function () {
			ReactDOM.findDOMNode(_this.refs['filter']).focus();
		});
	}
	render() {
		let _this = this;
		let children = _this.props.children ? ((_this.props.children instanceof Array) ? _this.props.children : [_this.props.children]) : [];
		return (
			<Dropdown id="dropdown-with-filter" className="with-filter">
				<Dropdown.Toggle onClick={_this.focusFilter.bind(_this)}>
					{_this.props.title}
				</Dropdown.Toggle>
				<FormControl
					ref="filter"
					type="text"
					onChange={_this.handleChange}
					value={_this.state.filter}
					onClick={function(e){e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}}
					onMouseDown={function(e){e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}}
				/>
				<Dropdown.Menu>
					{
						children.map(function (item,index) {
							if(item.props.name.indexOf(_this.state.filter) == -1) {
								return null;
							}
							return React.cloneElement(item,{...item.props,key:index,onSelect:function(eventKey,e){item.props.onSelect(eventKey);_this.setState({filter:''});}});
						})
					}
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}

module.exports = DropDownWithFilter;