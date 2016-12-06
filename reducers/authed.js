/**
 * Created by Totooria Hyperion on 2016/10/11.
 */

"use strict";
import * as types from '../constants/actionType';

const initialState = {
	admin:{
		'admin':'123456',
	},
	user:{
		'user1':'123456',
		'user2':'654321'
	},
	currentUser:{}
};

export default function authed(state = initialState, action) {
	let newState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case types.DO_LOGIN:
			return state;
		case types.LOGIN_COMPLETE:
			return {
				...state,
				currentUser:action.data
			};
		case types.EDIT_USER:
			newState[action.data.type][action.data.userName] = action.data.pwd;
			return newState;
		case types.DELETE_USER:
			delete newState[action.data.type][action.data.userName];
			return newState;
		case "RESET_DATA":
			return {
				...state,
				currentUser:{}
			};
		default:
			return state;
	}
}