/**
 * Created by Totooria Hyperion on 2016/11/14.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import util from "../../util/utility";
import MyForm from "../../components/singleForm";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomRadio from "../../components/CustomRadio";

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
			"startTime":"",
			"endTime":"",
			"actived":{
				"select":0
			}
		};
		this.doSearch = this.doSearch.bind(this);
	}
	doSearch() {
		let _this = this;
		console.log(_this.state);
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
				<h1>I'm Form Demo</h1>
				<div className="component_demo">
					<h4>Uncontrolled Input</h4>
					<MyForm formType="text" textType="text"
							  valueType="number" name="text1"
							  keepmsg="Number Only" value="Haha"
							  doCheck={true}
							  pattern={/^\d*$/} maxlength={10} placeholder="test" readonly={false} required={true} onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<h4>Controlled Input</h4>
					<MyForm type="text" controlled={true} name="text2" value={_this.state.text2} onChange={function(e){
						_this.setState({
							"text2":e.target.value
						},function() {
							_this.doSearch();
						});
					}}
					/>
					<h4>Uncontrolled Textarea</h4>
					<MyForm formType="textarea" textType="text" valueType="text" name="text3" keepmsg="Number Only" value="Haha" doCheck={true} maxlength={140} placeholder="test" readonly={false} required={true} onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<h4>Uncontrolled Datepicker</h4>
					<MyForm formType="time" textType="text" style={{width:"50%"}}
							  valueType="text" name="text4" value=""
							  doCheck={true}
							  placeholder="test" readonly={false}
							  required={true} timeId="h_i_m_n_i_startTime0"
							  dpSet={{dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'h_i_m_n_i_endTime0\')}'}}
							  onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<MyForm formType="time" textType="text" style={{width:"50%"}}
							  valueType="text" name="text5" value=""
							  doCheck={true}
							  placeholder="test" readonly={false}
							  required={true} timeId="h_i_m_n_i_endTime0"
							  dpSet={{dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'h_i_m_n_i_startTime0\')}'}}
							  onChange={function(oldValue,newValue){
						console.log(oldValue + " -> " + newValue);
					}} />
					<h4>Controlled Datepicker</h4>
					<MyForm formType="time" type="text" style={{width:"50%"}}
							  valueType="text" name="text4-1" value={_this.state.startTime}
							  placeholder="test" readonly={false}
							  required={true} timeId="h_i_m_n_i_startTime1"
							  dpSet={{dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'h_i_m_n_i_endTime1\')}'}}
							  onChange={function(oldValue,newValue){
						//console.log(oldValue + " -> " + newValue);
						_this.setState({
							startTime:newValue,
						},function() {
						  _this.doSearch();
						})
					}} />
					<MyForm formType="time" type="text" style={{width:"50%"}}
							  valueType="text" name="text5-1" value={_this.state.endTime}
							  placeholder="test" readonly={false}
							  required={true} timeId="h_i_m_n_i_endTime1"
							  dpSet={{dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'h_i_m_n_i_startTime1\')}'}}
							  onChange={function(oldValue,newValue){
						//console.log(oldValue + " -> " + newValue);
						_this.setState({
							endTime:newValue,
						},function() {
						  _this.doSearch();
						})
					}} />
					<h4 className="clearfix">
						<span style={{display:"block",float:"left",width:"50%"}}>Uncontrolled Select(withFilter)</span>
						<span style={{display:"block",float:"left",width:"50%"}}>Controlled Select</span>
					</h4>
					<MyForm formType="select" textType="text" valueType="text"
							  name="text6" keepmsg="Must Choose" withFilter={true}
							  value="" required={true} empty={false}
							  doCheck={true}
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
					<MyForm formType="select" controlled={true}
							  name="text7" keepmsg="Must Choose"
							  value={_this.state.select || ""} required={true} empty={false}
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
						//console.log(oldValue + " -> " + newValue);
						let keyValues = [
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
							  ];
						let state = util.deepCopy(_this.state);
						state.actived.select = keyValues.findIndex(function(item,index) {
							return item.value == newValue;
						});
						state.select = newValue;
						_this.setState(state,_this.doSearch);
					}} />
					<h4 className="clearfix">
						<span style={{display:"block",float:"left",width:"50%"}}>Uncontrolled Checkbox & Radio</span>
						<span style={{display:"block",float:"left",width:"50%"}}>Controlled Checkbox & Radio</span>
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
					<MyForm formType="checkbox" controlled={true} style={{width:"25%"}}
							  name="text9" value={_this.state.checkbox || ""}
							  description="A,B,C,D,E"
							  readonly={false} onChange={function(oldValue,newValue){
						_this.setState({
							checkbox:newValue
						},_this.doSearch)
					}} >
						<CustomCheckbox className="th_custom_checkbox" />
						<CustomRadio className="th_custom_radio" />
					</MyForm>
					<MyForm formType="radio" controlled={true} style={{width:"25%"}}
							  name="text11" value={_this.state.radio || ""}
							  description="A,B,C,D,E"
							  readonly={false} onChange={function(oldValue,newValue){
						_this.setState({
							radio:newValue
						},_this.doSearch)
					}} />
				</div>
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