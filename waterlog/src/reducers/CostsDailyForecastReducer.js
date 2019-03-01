import {
    FETCH_COSTS_FORECAST_BEGIN_DAILY,
    FETCH_COSTS_FORECAST_SUCCESS_DAILY,
    FETCH_COSTS_FORECAST_FAILURE_DAILY,
} from '../actions/Types';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_COSTS_FORECAST_BEGIN_DAILY:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_COSTS_FORECAST_SUCCESS_DAILY:
            return {
                ...state,
                loading: false,
                items: action.payload.forecastDaily,
                error: null
            };
        case FETCH_COSTS_FORECAST_FAILURE_DAILY:
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
