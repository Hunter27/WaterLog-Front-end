import {
    FETCH_FILTERED_ALERTS_BEGIN,
    FETCH_FILTERED_ALERTS_SUCCESS,
    FETCH_FILTERED_ALERTS_FAILURE
} from '../actions/Types';

const initialState = {
    items: [],
    loading: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_FILTERED_ALERTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_FILTERED_ALERTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.filteredAlerts,
                error: null
            }
        case FETCH_FILTERED_ALERTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
