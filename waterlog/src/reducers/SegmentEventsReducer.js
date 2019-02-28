import {
	FETCH_SEGMENT_EVENTS_BEGIN,
	FETCH_SEGMENT_EVENTS_SUCCESS,
	FETCH_SEGMENT_EVENTS_FAILURE
} from '../actions/Types';

const initialState = {
	items: [],
	loading: true,
	error: null
}

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_SEGMENT_EVENTS_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_SEGMENT_EVENTS_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.events,
				error: null
			}

		case FETCH_SEGMENT_EVENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			}
		default:
			return state;
	}
} 
