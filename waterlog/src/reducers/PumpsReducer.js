import {
	FETCH_PUMPS_BEGIN,
	FETCH_PUMPS_SUCCESS,
	FETCH_PUMPS_FAILURE
} from '../actions/Types';

const initialState = {
	items: [],
	loading: false,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_PUMPS_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_PUMPS_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.pumps,
				error: null
			};
		case FETCH_PUMPS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				item: []
			};
		default:
			return state;
	}
}
