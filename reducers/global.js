/**
 * Created by Totooria Hyperion on 2016/10/14.
 */
"use strict";
import * as types from '../constants/actionType';

const initialState = {
};

export default function global(state = initialState, action) {
	switch (action.type) {
		case "RESET_DATA":
			return initialState;
		default:
			return state;
	}
}