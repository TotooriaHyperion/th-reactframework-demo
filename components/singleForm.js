/**
 * Created by Totooria Hyperion on 2016/11/14.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Checkbox,Radio,FormControl,DropdownButton,MenuItem,FormGroup,HelpBlock } from 'react-bootstrap';
import WD from '../lib/My97DatePicker2/WdatePicker';
import DropdownButtonFilter from "./dropdown_filter";

const {$dp,WdatePicker} = WD();
window.$dp = $dp;
window.WdatePicker = WdatePicker;

import util from '../util/utility';

function getInitialState(_this, props, _type) {
	let formType = _type || props.formType;
	let cn = [];
	["form-control-wrap",(props.className || ""),(props.required ? "required" : ""),"th_" + formType].forEach(function (item,index) {
		if (!!item) {
			cn.push(item);
		}
	});
	let ret = {
		_props:{
			placeholder: props.placeholder,
			readOnly: props.readonly,
			value: props.value,
			name: props.name,
			type: props.textType,
		},
		//style: props.style,
		className: cn.join(" "),
		control: {
			show: false,
			target: () => ReactDOM.findDOMNode(_this.refs.target),
		},
		fromToControl: {
			show: false,
			target: () => ReactDOM.findDOMNode(_this.refs.target),
		},
		formType: formType,
		reg: props.pattern,
		maxlength: props.maxlength,
		valid: props.pattern instanceof RegExp ? props.pattern.test(props.value) : true,
		empty: props.empty,
		required: props.required,
		valueType: props.valueType,
	};
	let { description,value,keyValues } = props;
	//ret.value = value;
	ret.description = description;
	ret.keyValues = keyValues;
	// formate checkbox/radio key
	if (!description || (description == "")) {
		ret.descriptionArray = [];
	} else {
		ret.descriptionArray = description.split(",");
	}
	// formate checkbox/radio value
	let defaultValueArray = ret.descriptionArray.map(function (item,index) {
		return 0;
	});
	if (value == undefined) {
		ret.value = defaultValueArray.join(",");
		ret.valueArray = defaultValueArray;
	} else {
		if (!value.toString() || (value.toString() == "")) {
			ret.valueArray = defaultValueArray;
		} else {
			ret.valueArray = value.toString().split(",");
		}
	}
	// calculate value length
	ret.currentLength = ret._props.value.toString().length;
	// formate select actived
	if (keyValues instanceof Array) {
		keyValues.forEach(function (item,index) {
			if (item.value == ret._props.value) {
				ret.actived = index;
			}
		});
	}
	ret.init = false;
	if (formType == "select") {
		if ((ret.actived == 0) && !props.empty) {
			ret.valid = false;
		}
	}
	if (formType == "time") {
		if ((ret._props.value == "") && !props.empty) {
			ret.valid = false;
		}
	}
	return ret;
}

class MyForm extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props);
	}
	componentWillReceiveProps(nextProps,nextState) {
		if (!nextProps.controlled && (!util.isPropsEqual(this.props,nextProps,["children","dpSet"]))) {
			this.setState(getInitialState(this,nextProps));
		}
	}
	handleChange(index) {
		let _this = this;
		let props = _this.props;

		let theState = util.deepCopy(_this.state);
		if (theState.init) {
			theState.init = false;
		}
		let _props = theState._props;

		let oldValue = _props.value;
		let newValue;

		switch (theState.formType) {
			case 'checkbox':
				theState.valueArray[index] = theState.valueArray[index] == '0' ? '1' : '0';
				newValue = theState.valueArray.join(",");
				_props.value = newValue;
				break;
			case 'radio':
				newValue = index;
				theState.valueArray[0] = newValue;
				_props.value = newValue;
				break;
			case 'select':
				newValue = theState.keyValues[index].value;
				theState.valueArray[0] = newValue;
				_props.value = newValue;
				theState.actived = index;
				break;
			default:
				newValue = ReactDOM.findDOMNode(_this.refs.target).value;
				if (newValue.length > theState.maxlength) {
					return;
				}
				_props.value = ReactDOM.findDOMNode(_this.refs.target).value;
				theState.valueArray[0] = theState.value;
				theState.currentLength = newValue.length;
				break;
		}
		theState._props = _props;

		let isValid;
		isValid = props.pattern instanceof RegExp ? props.pattern.test(newValue) : true;
		if (!theState.empty && !theState.currentLength) {
			isValid = false;
		}
		if ((theState.formType == 'select') && (theState.required)) {
			isValid = _props.value != theState.keyValues[0].value;
		}
		theState.valid = isValid;

		_this.setState(theState, function () {
			(props.onChange instanceof Function) && props.onChange.call(_this,oldValue,newValue);
		});
	}
	render() {
		let _this = this;
		switch(_this.props.formType) {
			case "text":
				return renderInput.call(_this);
			case "textarea":
				return renderTextarea.call(_this);
			case "time":
				return renderTime.call(_this);
			case "select":
				return renderSelect.call(_this);
			case "checkbox":
				return renderCheckbox.call(_this);
			case "radio":
				return renderCheckbox.call(_this);
			default:
				return renderInput.call(_this);
		}
	}
}

function renderInput() {
	let _this = this;
	let props;
	let {controlled,doCheck,keepmsg,style,...rest} = _this.props;
	if (_this.props.controlled) {
		props = rest;
	} else {
		props = {
			..._this.state._props,
			onChange:_this.handleChange.bind(_this)
		};
	}
	return (
		<FormGroup
			style={style}
			className={_this.state.className}
			validationState={(!doCheck || _this.state.init) ? null : (_this.state.valid ? "success" : "error")}
		>
			<FormControl
				ref="target"
				{...props}
				data-valueType={_this.state.valueType}
			/>
			<FormControl.Feedback />
			<HelpBlock className={(!doCheck || _this.state.valid) ? "dn" : "" }>{(!_this.state.currentLength && !_this.props.empty) ? "Can't be empty" : keepmsg}</HelpBlock>
		</FormGroup>
	)
}

function getChildNode(customNodes, data) {
	let { index,state,_this,item } = data;
	let curNode;
	if (customNodes && customNodes.length) {
		for (let key in customNodes) {
			if (customNodes[key].type.typename == state.formType) {
				curNode = customNodes[key];
				break;
			}
		}
	} else {
		curNode = customNodes;
	}

	if (curNode && (curNode.type.isCustom)) {
		switch (state.formType) {
			case 'checkbox':
				return (
					React.cloneElement(curNode, {
						cln:state._props.readOnly ? "readonly" : "",
						key: index,
						checked: state.valueArray[index] == '1',
						desc: item,
						onChange: state._props.readOnly ? function(){} : _this.handleChange.bind(_this, index)
					})
				);
				break;
			case 'radio':
				return (
					React.cloneElement(curNode, {
						cln:state._props.readOnly ? "readonly" : "",
						key: index,
						checked: index == state.valueArray[0],
						desc: item,
						onChange: state._props.readOnly ? function(){} : _this.handleChange.bind(_this, index)
					})
				);
				break;
		}
	} else {
		switch (state.formType) {
			case 'checkbox':
				return (
					<Checkbox
						className={state._props.readOnly ? "readonly" : ""}
						key={index}
						checked={state.valueArray[index] == '1'}
						onChange={state._props.readOnly ? function(){} : _this.handleChange.bind(_this,index)}
					>
						<p className="col-sm-10">{item}</p>
					</Checkbox>
				);
				break;
			case 'radio':
				return (
					<Radio
						className={state._props.readOnly ? "readonly" : ""}
						key={index}
						checked={index == state.valueArray[0]}
						onChange={state._props.readOnly ? function(){} : _this.handleChange.bind(_this,index)}
					>
						<p className="col-sm-10">{item}</p>
					</Radio>
				);
				break;
		}
	}
}
function renderCheckbox() {
	let _this = this;
	let props;
	let {controlled,doCheck,keepmsg,readonly,formType,description,children,style,...rest} = _this.props;
	if (_this.props.controlled) {
		props = rest;
	} else {
		props = {
			..._this.state._props,
			onChange:_this.handleChange.bind(_this)
		};
	}
	return (
		<FormGroup
			style={style}
			className={_this.state.className}
		>
			{
				_this.state.descriptionArray.map(function (item, index) {
					return getChildNode(
						children,
						{
							index: index,
							state: _this.state,
							props: _this.props,
							_this: _this,
							item: item
						})
				})
			}
			<FormControl
				ref="target"
				{...props}
				type="hidden"
				className="dn"
				data-valueType={_this.state.valueType}
			/>
		</FormGroup>
	)
}
function renderRadio() {

}
function renderSelect() {
	let _this = this;
	let props;
	let {controlled,doCheck,keepmsg,empty,style,...rest} = _this.props;
	let { keyValues,actived,formType } = _this.state;
	if (_this.props.controlled) {
		let {keyValues,formType,..._rest} = rest;
		props = _rest;
	} else {
		props = {
			..._this.state._props,
			onChange:_this.handleChange.bind(_this)
		};
	}
	return (
		<FormGroup
			style={style}
			className={_this.state.className}
			validationState={(!doCheck || _this.state.init) ? null : (_this.state.valid ? "success" : "error")}
		>
			{
				_this.props.withFilter ? (
					<DropdownButtonFilter ref="target" bsStyle="default" title={keyValues[actived || 0].key || ''}
												 id="bg-vertical-dropdown-1">
						{
							keyValues.map(function (item, index) {
								return (
									<MenuItem key={index} onSelect={_this.handleChange.bind(_this,index)}
												 eventKey={index} name={item.key || ''}
												 active={actived == index}>{item.key}</MenuItem>
								)
							})
						}
					</DropdownButtonFilter>
				) : (
					<DropdownButton ref="target" bsStyle="default" title={keyValues[actived || 0].key}
										 id="bg-vertical-dropdown-1">
						{
							keyValues.map(function (item, index) {
								return (
									<MenuItem key={index} onSelect={_this.handleChange.bind(_this,index)}
												 eventKey={index} name={item.key}
												 active={actived == index}>{item.key}</MenuItem>
								)
							})
						}
					</DropdownButton>
				)
			}
			<FormControl
				ref="target"
				{...props}
				type="hidden"
				data-valueType={_this.state.valueType}
			/>
			<FormControl.Feedback />
			<HelpBlock className={(!doCheck || _this.state.valid) ? "dn" : "" }>{keepmsg}</HelpBlock>
		</FormGroup>
	)
}
function renderTime() {
	function handleClick(dpSet, e) {
		window.WdatePicker(dpSet, null, e.nativeEvent);
		this.startPick = true;
	}
	function handleBlur() {
		let _this = this;
		if (_this.startPick) {
			delete _this.startPick;
			return;
		}
		_this.handleChange.call(_this,0, 'text');
	}
	let _this = this;
	let props;
	let {controlled,doCheck,keepmsg,style,...rest} = _this.props;
	if (_this.props.controlled) {
		props = {
			...rest,
			id:_this.props.timeId,
			onClick:handleClick.bind(_this,_this.props.dpSet),
			onBlur:handleBlur.bind(_this)
		};
	} else {
		props = {
			..._this.state._props,
			id:_this.props.timeId,
			onClick:handleClick.bind(_this,_this.props.dpSet),
			onBlur:handleBlur.bind(_this)
		};
	}
	return (
		<FormGroup
			style={style}
			className={_this.state.className}
			validationState={(!doCheck || _this.state.init) ? null : (_this.state.valid ? "success" : "error")}
		>
			<FormControl
				ref="target"
				data-valueType={_this.state.valueType}
				{...props}
			/>
			<FormControl.Feedback />
			<HelpBlock className={(!doCheck || _this.state.valid) ? "dn" : "" }>{"Can't be empty"}</HelpBlock>
		</FormGroup>
	)
}
function renderTextarea() {
	let _this = this;
	let {currentLength,maxlength} = _this.state;
	let props;
	let {controlled,doCheck,keepmsg,style,...rest} = _this.props;
	if (_this.props.controlled) {
		props = rest;
	} else {
		props = {
			..._this.state._props,
			onChange:_this.handleChange.bind(_this)
		};
	}
	return (
		<FormGroup
			style={style}
			className={_this.state.className}
			validationState={(!doCheck || _this.state.init) ? null : (_this.state.valid ? "success" : "error")}
		>
			<FormControl
				ref="target"
				componentClass="textarea"
				data-valueType={_this.state.valueType}
				{...props}
			/>
			<FormControl.Feedback />
			<HelpBlock className="text-right">{(!doCheck || _this.state.valid) ? `已输入${currentLength}/${maxlength}字` : "Can't be empty"}</HelpBlock>
		</FormGroup>
	)
}

class CustomInput extends MyForm {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props, "text");
	}
	render() {
		let _this = this;
		return renderInput.call(_this);
	}
}
class CustomCheckbox extends MyForm {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props, "checkbox");
	}
	render() {
		let _this = this;
		return renderCheckbox.call(_this);
	}
}
class CustomRadio extends MyForm {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props, "radio");
	}
	render() {
		let _this = this;
		return renderCheckbox.call(_this);
	}
}
class CustomArea extends MyForm {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props, "textarea");
	}
	render() {
		let _this = this;
		return renderTextarea.call(_this);
	}
}
class CustomSelect extends MyForm {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props, "select");
	}
	render() {
		let _this = this;
		return renderSelect.call(_this);
	}
}
class CustomTime extends MyForm {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props, "time");
	}
	render() {
		let _this = this;
		return renderTime.call(_this);
	}
}

MyForm.Input = CustomInput;
MyForm.Checkbox = CustomCheckbox;
MyForm.Radio = CustomRadio;
MyForm.Textarea = CustomArea;
MyForm.Select = CustomSelect;
MyForm.Time = CustomTime;

export default MyForm;