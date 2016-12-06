/**
 * Created by Totooria Hyperion on 2016/10/12.
 */

"use strict";

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

let monthDay = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function isRun(year) {
	let $4 = (year % 4 == 0);
	let $100 = (year % 100 == 0);
	let $400 = (year % 400 == 0);
	if ($400) {
		return true;
	}
	return $4 && !$100;
}

function getInitialState(props,state) {
	let ret = {
		...state
	};
	return ret;
}

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState(props,{});
		this.formatData = this.formatData.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState(getInitialState(nextProps,this.state));
	}
	render() {
		let _this = this;
		let { clickCallback } = _this.props;
		clickCallback = (clickCallback instanceof Function) ? clickCallback : function(){}
		let tableData = _this.formatData(_this.props.data,_this.props.year,_this.props.month);
		tableData = (tableData instanceof Array) ? tableData : [];
		return (
			<table className={"th-calendar " + (_this.props.tableClass || "")}>
				<thead className={" " + (_this.props.theadClass || "")}>
					<tr>
						<th>日</th>
						<th>一</th>
						<th>二</th>
						<th>三</th>
						<th>四</th>
						<th>五</th>
						<th>六</th>
					</tr>
				</thead>
				<tbody className={" " + (_this.props.tbodyClass || "")}>
				{
					tableData.map(function (item,index) {
						return (
							<tr key={index}>
								{
									item.map(function (subItem,subIndex) {
										return (
											<td key={index + '_' + subIndex} onClick={clickCallback.bind(null,subItem)}>
												{
													_this.props.template(subItem)
												}
											</td>
										)
									})
								}
							</tr>
						)
					})
				}
				</tbody>
			</table>
		)
	}
	formatData(data,theYear,theMonth) {
		//let theDay = new Date(data[0]);
		//let theYear = theDay.getFullYear();
		//let theMonth = theDay.getMonth() + 1;
		const today = new Date();
		const currentYear = theYear || today.getFullYear();
		const currentMonth = theMonth || today.getMonth() + 1;
		const prevMonth = currentMonth - 1;
		let lacked = (new Date(currentYear,currentMonth-1,1)).getDay();
		lacked = lacked == 7 ? 0 : lacked;
		if (isRun(currentYear)) {
			monthDay[2] = 29;
		}
		let total;
		let daySum = monthDay[currentMonth];
		let lastDaySum;
		if(currentMonth - 1 == 0) {
			lastDaySum = monthDay[12];
		} else {
			lastDaySum = monthDay[currentMonth - 1];
		}
		if (lacked + daySum <= 5*7) {
			total = 5*7;
		} else {
			total = 6*7;
		}
		let tableData = [[]];
		let weekCount = 0;
		for(let i=0;i<total;i++) {
			let aDay;
			let isLastMonth = false;
			let isNextMonth = false;
			if(lacked > i) {
				aDay = new Date(currentYear,currentMonth-2,lastDaySum - lacked + 1 + i);
				isLastMonth = true;
			} else if(i-lacked+1 > daySum) {
				aDay = new Date(currentYear,currentMonth,i - lacked + 1 - daySum);
				isNextMonth = true;
			} else {
				aDay = new Date(currentYear,currentMonth-1,i - lacked + 1);
			}
			let _data = data.find(function(item,index){return Date.parse(item.date) == Date.parse(aDay)});
			let isPast = Date.parse(aDay) < (new Date).getTime();
			tableData[weekCount].push(this.props.format(aDay,{isPast:isPast,isLastMonth:isLastMonth,isNextMonth:isNextMonth},_data));
			if(i%7 == 6) {
				tableData[++weekCount] = [];
			}
		}
		if (tableData[tableData.length - 1].length == 0) {
			tableData.pop();
		}
		//this.setState({tableData:tableData});
		return tableData;
	}
}

Calendar.propTypes = {
	format:PropTypes.func
};

module.exports = Calendar;