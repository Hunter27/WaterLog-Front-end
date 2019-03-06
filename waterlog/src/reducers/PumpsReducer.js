import {
	FETCH_PUMPS_BEGIN,
	FETCH_PUMPS_SUCCESS,
	FETCH_PUMPS_FAILURE
} from '../actions/Types';

const initialState = {
	item: [],
	loading: false,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_PUMPS_BEGIN:
			return {
				loading: true,
				error: null
			};
		case FETCH_PUMPS_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.pump,
				error: null
			};
		case FETCH_PUMPS_FAILURE:
			return {
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
}
