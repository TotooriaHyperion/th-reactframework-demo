/**
 * Created by Totooria Hyperion on 2016/9/28.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Col,Checkbox,Radio,Overlay,Popover,FormControl,ControlLabel,DropdownButton,MenuItem } from 'react-bootstrap';
import WD from '../lib/My97DatePicker2/WdatePicker';
import DropdownButtonFilter from "./dropdown_filter";

//import CustomRadios from "./CustomRadio";
//import CustomCheckboxs from "./CustomCheckbox";

const {$dp,WdatePicker} = WD();
window.$dp = $dp;
window.WdatePicker = WdatePicker;

import util from '../util/utility';

function getInitialState(_this, props) {
	let formInfo = util.deepCopy(props.formInfo);
	if (!formInfo.descriptionArray) {
		if (!formInfo.description || (formInfo.description == "")) {
			formInfo.descriptionArray = [];
		} else {
			formInfo.descriptionArray = formInfo.description.split(",");
		}
	}
	if (!formInfo.valueArray) {
		if (formInfo.value == undefined) {
			formInfo.value = '';
			formInfo.valueArray = [];
		} else {
			if (!formInfo.value.toString() || (formInfo.value.toString() == "")) {
				formInfo.valueArray = [];
			} else {
				formInfo.valueArray = formInfo.value.toString().split(",");
			}
		}
	}
	formInfo.currentLength = formInfo.value.toString().length;
	if (formInfo.keyValues instanceof Array) {
		formInfo.keyValues.forEach(function (item,index) {
			if (item.value == formInfo.value) {
				formInfo.actived = index;
			}
		});
	}
	return {
		className: "form-control-wrap " + (props.className || "") + " " + (formInfo.className || "") + " " + (formInfo.required ? "required" : ""),
		control: {
			show: props.show1,
			target: () => ReactDOM.findDOMNode(_this.refs.target),
		},
		fromToControl: {
			show: props.show2,
			target: () => ReactDOM.findDOMNode(_this.refs.target),
		},
		pop: props.pop,
		reg: props.formInfo.pattern,
		maxlength: props.formInfo.maxlength,
		formInfo: formInfo,
		input_check: _this.input_check,
		fromToCheck: _this.fromToCheck,
		handleChange: _this.handleChange.bind(_this)
	};
}

function getChildNode(customNodes, data) {
	let { index,formInfo,_this,_type,item,customType } = data;
	let curNode;
	if (customNodes && customNodes.length) {
		for (let key in customNodes) {
			if (customNodes[key].type.typename == _type) {
				curNode = customNodes[key];
				break;
			}
		}
	} else {
		curNode = customNodes;
	}
	if (curNode && (curNode.type.isCustom)) {
		switch (_type) {
			case 'checkbox':
				return (
					React.cloneElement(curNode, {
						cln:formInfo.readonly ? "readonly" : "",
						key: index,
						checked: formInfo.valueArray[index] == '1',
						desc: item,
						onChange: formInfo.readonly ? function(){} : _this.handleChange.bind(_this, index, formInfo.type)
					})
				);
				break;
			case 'radio':
				return (
					React.cloneElement(curNode, {
						cln:formInfo.readonly ? "readonly" : "",
						key: index,
						checked: index == formInfo.valueArray[0],
						desc: item,
						onChange: formInfo.readonly ? function(){} : _this.handleChange.bind(_this, index, formInfo.type)
					})
				);
				break;
		}
	} else {
		switch (_type) {
			case 'checkbox':
				return (
					<Checkbox
						className={formInfo.readonly ? "readonly" : ""}
						key={index}
						checked={formInfo.valueArray[index] == '1'}
						onChange={formInfo.readonly ? function(){} : _this.handleChange.bind(_this,index,formInfo.type)}
					>
						<p className="col-sm-10">{item}</p>
					</Checkbox>
				);
				break;
			case 'radio':
				return (
					<Radio
						className={formInfo.readonly ? "readonly" : ""}
						key={index}
						checked={index == formInfo.valueArray[0]}
						onChange={formInfo.readonly ? function(){} : _this.handleChange.bind(_this,index,formInfo.type)}
					>
						<p className="col-sm-10">{item}</p>
					</Radio>
				);
				break;
		}
	}
}

class MyForm extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState(this, props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(getInitialState(this, nextProps));
	}
	render() {
		return null;
	}

	handleChange(index, type, child, e) {
		let _child = this;
		let _father = this;
		if (!!this.props.formContext) {
			return _child.props.formContext.state.handleChange(index, type, this, child);
		} else {
			_child = child;
		}
		if (this.constructor != ThForm) {
			_child = this;
		}
		let newFormInfo = util.deepCopy(_father.state.formInfo);
		let oldFormInfo = util.deepCopy(_father.state.formInfo);
		switch (type) {
			case 'checkbox':
				newFormInfo.valueArray[index] = newFormInfo.valueArray[index] == '0' ? '1' : '0';
				newFormInfo.value = newFormInfo.valueArray.join(",");
				break;
			case 'radio':
				newFormInfo.valueArray[0] = index;
				newFormInfo.value = index;
				break;
			case 'select':
				newFormInfo.valueArray[0] = newFormInfo.keyValues[index].value;
				newFormInfo.value = newFormInfo.keyValues[index].value;
				newFormInfo.actived = index;
				//_father.setState({
				//	control: {
				//		..._father.state.control,
				//		show: newFormInfo.value == newFormInfo.keyValues[0].value,
				//		//target:e.target
				//	},
				//});
				break;
			default:
				let newValue = ReactDOM.findDOMNode(_child.refs.target).value;
				if (newValue.length > _father.state.maxlength) {
					return;
				}
				newFormInfo.value = ReactDOM.findDOMNode(_child.refs.target).value;
				newFormInfo.valueArray[0] = newFormInfo.value;
				newFormInfo.currentLength = newValue.length;
				break;
		}
		_father.setState({
			formInfo: newFormInfo
		});
		_father.props.changeCallback ? _father.props.changeCallback.call(_father,newFormInfo.value,oldFormInfo.value) : {};
		_father.props.formInfo.changeCallback ? _father.props.formInfo.changeCallback.call(_father,newFormInfo.value,oldFormInfo.value) : {};
	}

	p_destroy() {
		this.setState({
			control: {
				...this.state.control,
				show: false
			},
			fromToControl: {
				...this.state.control,
				show: false
			}
		})
	}

	input_check(formInfo, e) {
		const ignore = ['img'];
		if (ignore.findIndex(function (item) {
				return item == formInfo.type;
			}) > -1) {
			return;
		}
		let addIsValid = true;
		if (typeof formInfo.input_check == 'function') {
			addIsValid = formInfo.input_check.call(this,formInfo);
		}
		let value = this.state.formInfo.value;
		let isValid = this.state.reg instanceof RegExp ? this.state.reg.test(value) : true;
		if (!this.state.formInfo.empty && (value.length == 0)) {
			isValid = false;
		}
		if ((formInfo.type == 'select') && (formInfo.required)) {
			isValid = isValid && (formInfo.value != formInfo.keyValues[0].value);
		}
		isValid = addIsValid && isValid;
		this.setState({
			control: {
				...this.state.control,
				show: !isValid,
				//target:e.target
			},
			pop: !isValid
		});
		if (isValid) {
			let connect = formInfo.connect;
			if (connect && (connect != '')) {
				this.props.fromToCheck && this.props.fromToCheck(connect, this, formInfo.equal);
			}
			this.props.blurCallback ? this.props.blurCallback.call(this,value) : {};
			this.props.formInfo.blurCallback ? this.props.formInfo.blurCallback.call(this,value) : {};
		}
		return isValid;
	}
}

class CustomInput extends MyForm {
	constructor(props) {
		super(props);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		return (
			<div className={"clearfix input " + _this.state.className}>
				<Col componentClass={ControlLabel} sm={4}>
					{formInfo.title}
				</Col>
				<Col sm={8} className="control-body">
					<div ref="pop" style={{position:"relative",verticalAlign:"middle",height:"34px",display:"inline-block"}}>
						<FormControl
							ref="target"
							className={_this.state.pop ? 'on' : ''}
							type={formInfo.textType}
							placeholder={formInfo.placeholder}
							value={formInfo.value}
							name={formInfo.commonKey}
							data-connect={formInfo.connect}
							readOnly={formInfo.readonly}
							onFocus={_this.p_destroy.bind(_this.props.formContext || _this)}
							onBlur={_this.input_check.bind(_this.props.formContext || _this,formInfo)}
							onChange={_this.handleChange.bind(_this,0,formInfo.type)}
						/>
					</div>
					<Overlay {..._this.state.control} placement={formInfo.popPos}>
						<Popover id="tt" title="">
							{formInfo.keepmsg}
						</Popover>
					</Overlay>
					<Overlay {..._this.state.fromToControl} placement={formInfo.popPos}>
						<Popover id="tt" title="">
							{formInfo.fromToMessage}
						</Popover>
					</Overlay>
				</Col>
			</div>
		)
	}
}
class CustomCheckbox extends MyForm {
	constructor(props) {
		super(props);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		return (
			<div className={"clearfix checkbox " + _this.state.className}>
				<Col componentClass={ControlLabel} sm={2}>
					{formInfo.title}
				</Col>
				<Col sm={6} className="control-body">
					{
						formInfo.descriptionArray.map(function (item, index) {
							return getChildNode(
								_this.props.children,
								{
									index: index,
									formInfo: formInfo,
									_this: _this,
									_type: 'checkbox',
									//customType: CustomCheckboxs,
									item: item
								})
						})
					}
					<FormControl
						ref="target"
						type="hidden"
						value={formInfo.value}
						name={formInfo.commonKey}
					/>
				</Col>
			</div>
		)
	}
}
class CustomRadio extends MyForm {
	constructor(props) {
		super(props);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		return (
			<div className={"clearfix radio " + _this.state.className}>
				<Col componentClass={ControlLabel} sm={2}>
					{formInfo.title}
				</Col>
				<Col sm={6} className="control-body">
					{
						formInfo.descriptionArray.map(function (item, index) {
							return getChildNode(
								_this.props.children,
								{
									index: index,
									formInfo: formInfo,
									_this: _this,
									_type: 'radio',
									//customType: CustomRadios,
									item: item
								})
						})
					}
					<FormControl
						ref="target"
						type="hidden"
						value={formInfo.value}
						name={formInfo.commonKey}
					/>
				</Col>
			</div>
		)
	}
}
class CustomSelect extends MyForm {
	constructor(props) {
		super(props);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		return (
			<div className={"clearfix select " + _this.state.className}>
				<Col componentClass={ControlLabel} sm={2}>
					{formInfo.title}
				</Col>
				<Col sm={6} className="control-body">
					{
						formInfo.withFilter ? (
							<DropdownButtonFilter ref="target" bsStyle="default" title={formInfo.keyValues[formInfo.actived || 0].key || ''}
														 id="bg-vertical-dropdown-1">
								{
									formInfo.keyValues.map(function (item, index) {
										return (
											<MenuItem key={index} onSelect={_this.handleChange.bind(_this,index,formInfo.type)}
														 eventKey={index} name={item.key || ''}
														 active={formInfo.actived == index}>{item.key}</MenuItem>
										)
									})
								}
							</DropdownButtonFilter>
						) : (
							<DropdownButton ref="target" bsStyle="default" title={formInfo.keyValues[formInfo.actived || 0].key}
														 id="bg-vertical-dropdown-1">
								{
									formInfo.keyValues.map(function (item, index) {
										return (
											<MenuItem key={index} onSelect={_this.handleChange.bind(_this,index,formInfo.type)}
														 eventKey={index} name={item.key}
														 active={formInfo.actived == index}>{item.key}</MenuItem>
										)
									})
								}
							</DropdownButton>
						)
					}
					<FormControl
						type="hidden"
						value={formInfo.value}
						name={formInfo.commonKey}
					/>
					<Overlay {..._this.state.control} placement={formInfo.popPos}>
						<Popover id="tt" title="">
							{formInfo.keepmsg}
						</Popover>
					</Overlay>
				</Col>
			</div>
		)
	}
}
class CustomArea extends MyForm {
	constructor(props) {
		super(props);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		return (
			<div className={"clearfix textarea " + _this.state.className}>
				<Col componentClass={ControlLabel} sm={2}>
					{formInfo.title}
				</Col>
				<Col sm={8} className="control-body">
					<FormControl
						ref="target"
						className={_this.state.pop ? 'on' : ''}
						type={formInfo.type}
						componentClass="textarea"
						placeholder={formInfo.placeholder}
						value={formInfo.value}
						name={formInfo.commonKey}
						readOnly={formInfo.readonly}
						onBlur={_this.input_check.bind(_this,formInfo)}
						onChange={_this.handleChange.bind(_this,0,formInfo.type)}
					/>
					<Overlay {..._this.state.control} placement={formInfo.popPos}>
						<Popover id="tt" title="">
							{formInfo.keepmsg}
						</Popover>
					</Overlay>
					<span>已输入：{formInfo.currentLength}/{formInfo.maxlength}</span>
				</Col>
			</div>
		)
	}
}
class CustomTime extends MyForm {
	constructor(props) {
		super(props);
	}

	handleClick(dpSet, e) {
		window.WdatePicker(dpSet, null, e.nativeEvent);
	}

	handleBlur(formInfo) {
		let _this = this;
		_this.handleChange.call(_this,0, 'text');
		setTimeout(function () {
			_this.input_check.call(_this, formInfo);
		});
		//let _this = this.formContext ? this.formContext : this;
		//setTimeout(function () {
		//	_this.handleChange(0, 'text');
		//},1000);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		return (
			<div className={"clearfix time " + _this.state.className}>
				<Col componentClass={ControlLabel} sm={4}>
					{formInfo.title}
				</Col>
				<Col sm={8} className="control-body">
					<FormControl
						ref="target"
						type="text"
						placeholder={formInfo.placeholder}
						id={formInfo.timeId}
						defaultValue={formInfo.value}
						readOnly={formInfo.readonly}
						onClick={_this.handleClick.bind(_this,formInfo.dpSet)}
						onFocus={_this.p_destroy.bind(_this)}
						onBlur={_this.handleBlur.bind(_this,formInfo)}
						onChange={_this.handleChange.bind(_this,0,'text')}
					/>
					<Overlay {..._this.state.control} placement={formInfo.popPos}>
						<Popover id="dd" title="">
							{formInfo.keepmsg}
						</Popover>
					</Overlay>
					<Overlay {..._this.state.fromToControl} placement={formInfo.popPos}>
						<Popover id="dd" title="">
							{formInfo.fromToMessage}
						</Popover>
					</Overlay>
				</Col>
			</div>
		)
	}
}
class CustomImg extends MyForm {
	constructor(props) {
		super(props);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		return (
			<FormControl
				className="dn"
				ref="target"
				type='hidden'
				placeholder={formInfo.placeholder}
				value={formInfo.value}
				name={formInfo.commonKey}
			/>
		)
	}
}
class ThForm extends MyForm {
	constructor(props) {
		super(props);
	}

	render() {
		let _this = this;
		let formInfo = util.deepCopy(_this.state.formInfo);
		formInfo.pattern = _this.state.formInfo.pattern;
		switch (formInfo.type) {
			case "checkbox":
				return (<CustomCheckbox ref="child" {..._this.props} formInfo={formInfo} formContext={_this}/>);
				break;
			case "radio":
				return (<CustomRadio ref="child" {..._this.props} formInfo={formInfo} formContext={_this}/>);
				break;
			case "select":
				return (<CustomSelect ref="child" {..._this.props} pop={_this.state.pop} show1={_this.state.control.show}
											 show2={_this.state.fromToControl.show} formInfo={formInfo} formContext={_this}/>);
				break;
			case "textarea":
				return (<CustomArea ref="child" {..._this.props} formInfo={formInfo} formContext={_this}/>);
				break;
			case "time":
				return (<CustomTime ref="child" {..._this.props} pop={_this.state.pop} show1={_this.state.control.show}
										  show2={_this.state.fromToControl.show} formInfo={formInfo} formContext={_this}/>);
				break;
			case "img":
				return (<CustomImg ref="child" {..._this.props} formInfo={formInfo} formContext={_this}/>);
				break;
			default:
				return (<CustomInput ref="child" {..._this.props} pop={_this.state.pop} show1={_this.state.control.show}
											show2={_this.state.fromToControl.show} formInfo={formInfo} formContext={_this}/>);
				break;
		}
	}
}

ThForm.Input = CustomInput;
ThForm.Checkbox = CustomCheckbox;
ThForm.Radio = CustomRadio;
ThForm.Textarea = CustomArea;
ThForm.Select = CustomSelect;
ThForm.Time = CustomTime;
ThForm.Img = CustomImg;

export default ThForm;