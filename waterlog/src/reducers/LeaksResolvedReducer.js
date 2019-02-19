import {
	FETCH_SEGMENTS_RESOLVED_BEGIN,
	FETCH_SEGMENTS_RESOLVED_SUCCESS,
	FETCH_SEGMENTS_RESOLVED_FAILURE
} from '../actions/Types';

const initialState = {
	items: [],
	item: {},
	loading: true,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_SEGMENTS_RESOLVED_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_SEGMENTS_RESOLVED_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.leaksResolves,
				error: null
			};

		case FETCH_SEGMENTS_RESOLVED_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
}
