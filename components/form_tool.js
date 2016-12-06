/**
 * Created by Totooria Hyperion on 2016/11/15.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Form } from "react-bootstrap";
import util from "../util/utility";
import MyForm from "../components/singleForm";

class MyFormTool extends Component {
	render() {
		let _this = this;
		let childrens = _this.props.children ? _this.props.children : [];
		childrens = childrens.map ? childrens : [childrens];
		return (
			<Form className={" " + _this.props.className}>
				{childrens}
			</Form>
		)
	}
	fromToCheck() {

	}
	getFormData() {
		let myForm = ReactDOM.findDOMNode(this);
		let ipts = myForm.getElementsByClassName("form-control-wrap");
		let formData = {};
		for(let i=0;i<ipts.length;i++) {
			//ipts[i].focus();
			//ipts[i].blur();
			//let event = new MouseEvent('blur');
			//ipts[i].dispatchEvent(event);
			if (util.hasClass(ipts[i], 'has-error')) {
				return util.showToast("表单数据输入有误,请检查");
			}
			let ipt = ipts[i].getElementsByClassName("form-control")[0];
			if (ipt.name.length) {
				switch(ipt.dataset["valueType"]) {
					case 'bool':
						formData[ipt.name] = !!ipt.value;
						break;
					case 'number':
						formData[ipt.name] = Number(ipt.value);
						break;
					default:
						formData[ipt.name] = ipt.value;
						break;
				}
			}
		}
		return formData;
	}
}

module.exports = MyFormTool;