/**
 * Created by Totooria Hyperion on 2016/11/15.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import util from "../../util/utility";
import MyForm from "../../components/singleForm";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomRadio from "../../components/CustomRadio";
import MyFormTool from "../../components/form_tool";

//import '../../scss/single_tab1.scss';
import "../../scss/component_demo.scss";

class ComponentDemo extends Component {
	constructor(props,context) {
		super(props,context);
		this.state = {
			"text2":"haha",
			"select":"",
			"checkbox":"",
			"radio":1,
			"actived":{
				"select":0
			}
		};
		this.doSearch = this.doSearch.bind(this);
	}
	doSearch() {
		let _this = this;
		//console.log(_this.state);
		let formData = _this.refs["theForm"].getFormData();
		console.log(formData);
	}
	render() {
		let _this = this;
		return (
			<div style={{'minHeight':1000}}>
				<ol className="breadcrumb">
					<li className="">User</li>
					<li className="">Component Demo</li>
					<li className="active">Form Demo</li>
				</ol>
				<h1>I'm Form Tool Demo</h1>
				<MyFormTool ref="theForm" className="component_demo clearfix">
					<h4>Uncontrolled Input</h4>
					<MyForm formType="text" textType="text" valueType="number" name="text1" keepmsg="Number Only" value="Haha" pattern={/^\d*$/} maxlength={10} placeholder="test" readonly={false} required={true} onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<h4>Uncontrolled Textarea</h4>
					<MyForm formType="textarea" textType="text" valueType="text" name="text3" keepmsg="Number Only" value="Haha" maxlength={140} placeholder="test" readonly={false} required={true} onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<h4>Uncontrolled Datepicker</h4>
					<MyForm formType="time" textType="text" style={{width:"50%"}}
							  valueType="text" name="text4" value=""
							  placeholder="test" readonly={false}
							  empty={false}
							  required={true} timeId="h_i_m_n_i_startTime0"
							  dpSet={{dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'h_i_m_n_i_endTime0\')}'}}
							  onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<MyForm formType="time" textType="text" style={{width:"50%"}}
							  valueType="text" name="text5" value=""
							  placeholder="test" readonly={false}
							  empty={false}
							  required={true} timeId="h_i_m_n_i_endTime0"
							  dpSet={{dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'h_i_m_n_i_startTime0\')}'}}
							  onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<h4 className="clearfix">
						Uncontrolled Select
					</h4>
					<MyForm formType="select" textType="text" valueType="text"
							  name="text6" keepmsg="Must Choose"
							  value="" required={true} empty={false}
							  keyValues={[
							  		{
										key:"Please Choose",
										value:""
									},
							  		{
										key:"Select 1",
										value:"1"
									},
							  		{
										key:"Select 2",
										value:"2"
									}
							  ]}
							  onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<h4 className="clearfix">
						Uncontrolled Checkbox & Radio
					</h4>
					<MyForm formType="checkbox" style={{width:"25%"}}
							  textType="text" valueType="text"
							  name="text8" value="0,1,1,0,0"
							  description="A,B,C,D,E"
							  readonly={false} onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<MyForm formType="radio" style={{width:"25%"}}
							  textType="text" valueType="text"
							  name="text10" value="2"
							  description="A,B,C,D,E"
							  readonly={false} onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} >
						<CustomCheckbox className="th_custom_checkbox" />
						<CustomRadio className="th_custom_radio" />
					</MyForm>
				</MyFormTool>
				<button className="btn btn-yel" onClick={_this.doSearch}>
					Save
				</button>
			</div>
		)
	}
}

ComponentDemo.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(state => state)(ComponentDemo);

module.exports = ConnectApp;