import {
	FETCH_COSTS_FORECAST_BEGIN_MONTHLY,
	FETCH_COSTS_FORECAST_SUCCESS_MONTHLY,
	FETCH_COSTS_FORECAST_FAILURE_MONTHLY,
} from '../actions/Types';

const initialState = {
	items: [],
	loading: false,
	error: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_COSTS_FORECAST_BEGIN_MONTHLY:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_COSTS_FORECAST_SUCCESS_MONTHLY:
			return {
				...state,
				loading: false,
				items: action.payload.forecastMonthly,
				error: null
			};
		case FETCH_COSTS_FORECAST_FAILURE_MONTHLY:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			};
		default:
			return state;
	}
}  
