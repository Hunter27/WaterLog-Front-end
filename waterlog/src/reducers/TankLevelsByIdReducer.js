import { FETCH_TANK_LEVEL_BEGIN, FETCH_TANK_LEVEL_FAILURE, FETCH_TANK_LEVEL_SUCCESS } from '../actions/Types';

const initialState = {
	item: {}
};
export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_TANK_LEVEL_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_TANK_LEVEL_SUCCESS:
			return {
				...state,
				item: action.payload.level,
				loading: false,
				error: null
			};
		case FETCH_TANK_LEVEL_FAILURE:
			return {
				...state,
				loading: false,
				item: {},
				error: action.payload.error
			};
		default:
			return state;
	}
}
