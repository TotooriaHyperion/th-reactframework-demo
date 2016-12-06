/**
 * Created by Totooria Hyperion on 2016/10/11.
 */

import React, { Component, PropTypes } from 'react';

class CustomRadio extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let _this = this;
		let cln = _this.props.className || '';
		return (
			<div className={cln + " " + _this.props.cln}>
				<label className="clearfix" style={{width:'100%'}} onClick={_this.props.onChange}>
					<b className={"act_radio fl " + (this.props.checked ? " active" : "")}/>
					<p className="col-sm-10" style={{fontWeight:400,cursor:"pointer"}}>{this.props.desc}</p>
				</label>
			</div>
		)
	}
}

CustomRadio.isCustom = true;
CustomRadio.typename = "radio";

module.exports = CustomRadio;