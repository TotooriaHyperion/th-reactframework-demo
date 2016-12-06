/**
 * Created by Totooria Hyperion on 2016/11/15.
 */
"use strict";

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import util from "../../util/utility";

import { DropdownButton,MenuItem } from "react-bootstrap";
import Calender from "../../components/calender";

let timeData = [];
let today = new Date();
let todayMidday = new Date(today.getFullYear(),today.getMonth(),today.getDate());

function getTemplate(formatedDate) {
	let date = formatedDate.date;
	return (
		<div style={{color:formatedDate.color,cursor:(formatedDate.canClick ? "pointer" : "")}}
			  onClick={formatedDate.callback}
		>
			<strong>{date.toLocaleDateString()}</strong>
		</div>
	)
}

function format(theDay,options,data) {
	let _data = data || {};
	let available = !options.isPast && !options.isLastMonth && !options.isNextMonth;
	return {
		date:theDay,
		color:available ? "#000" : "#999",
		canClick:available,
		callback:function() {
			if (!available) {
				return;
			}
			if(!data) {
				return alert("Don't have this day's data");
			}
			(_data.handleClick instanceof Function) && _data.handleClick(theDay);
		}
	}
}

for(let i=0;i<31;i++) {
	timeData.push({
		date:new Date(todayMidday.getTime() - 0 + 86400000 * i),
		message:"hello~Totooria~"
	})
}

const Month = [1,2,3,4,5,6,7,8,9,10,11,12];
const toDay = new Date();
const Year = [
	toDay.getFullYear()-1,
	toDay.getFullYear(),
	toDay.getFullYear()+1,
	toDay.getFullYear()+2,
];

class PointDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year:(new Date()).getFullYear(),
			month:(new Date()).getMonth() + 1
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.doSearch = this.doSearch.bind(this);
	}
	doSearch(time) {
		alert("You have clicked " + time.toLocaleDateString());
	}
	render() {
		let _this = this;
		let { year,month } = _this.state;
		timeData = timeData.map(function (item,index) {
			return {
				...item,
				handleClick:_this.doSearch
			}
		});
		return (
			<div style={{'minHeight':1000}}>
				<ol className="breadcrumb">
					<li className="">User</li>
					<li className="">Component Demo</li>
					<li className="active">Calendar Demo</li>
				</ol>
				<h1>I'm Calendar Demo</h1>
				<DropdownButton bsStyle="default" bsSize="sm" title={month + "月"} id="bg-vertical-dropdown-2" className="month">
					{
						Month.map(function (item, index) {
							return (
								<MenuItem key={index} onSelect={_this.handleSelect.bind(_this,'month',item)}
											 eventKey={index}
											 active={month == item}>{item}月</MenuItem>
							)
						})
					}
				</DropdownButton>
				<DropdownButton bsStyle="default" bsSize="sm" title={year + "年"} id="bg-vertical-dropdown-1" className="year">
					{
						Year.map(function (item, index) {
							return (
								<MenuItem key={index} onSelect={_this.handleSelect.bind(_this,'year',item)}
											 eventKey={index}
											 active={year == item}>{item}年</MenuItem>
							)
						})
					}
				</DropdownButton>
				<Calender data={timeData} year={year} month={month} template={getTemplate} format={format} tableClass="table table-bordered table-hover"/>
			</div>
		)
	}
	handleSelect(type,data,eventKey) {
		let _this = this;
		let year = _this.state.year;
		let month = _this.state.month;
		switch (type) {
			case 'year':
				year = data;
				break;
			case 'month':
				month = data;
				break;
		}
		_this.setState({
			year:year,
			month:month
		});
	}
}


PointDetail.contextTypes = {
	router: React.PropTypes.object.isRequired,
	store:React.PropTypes.object
};

let ConnectApp = connect(state => state)(PointDetail);

module.exports = ConnectApp;