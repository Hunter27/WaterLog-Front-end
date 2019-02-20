import { FETCH_WASTAGE_DAILY_BEGIN,FETCH_WASTAGE_DAILY_SUCCESS,FETCH_WASTAGE_DAILY_FAILURE } from '../actions/Types';

const initialState = {
	item: {
		dataPoints: [ { x: '0', y: '0' } ]
	},
	loading: true,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_WASTAGE_DAILY_BEGIN:
		return {
			...state,
			loading: true,
			error: null
		}
		case FETCH_WASTAGE_DAILY_SUCCESS:
			return {
				...state,
				loading: false,
				item: action.payload.dailyWaste
			};
		case FETCH_WASTAGE_DAILY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                item: {}
            }
		default:
			return state;
	}
}
