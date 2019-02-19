import { 
	FETCH_LEAK_LITRES_BEGIN, 
	FETCH_LEAK_LITRES_SUCCESS, 
	FETCH_LEAK_LITRES_FAILURE 
} from '../actions/Types';

const initialState = {
	item: {},
	loading: false,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_LEAK_LITRES_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_LEAK_LITRES_SUCCESS:
			return {
				...state,
				loading: false,
				item: action.payload.litres,
				error: null
			};
		case FETCH_LEAK_LITRES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				item: {}
			};
		default:
			return state;
	}
}
