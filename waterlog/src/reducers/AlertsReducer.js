import {
    FETCH_ALERTS_BEGIN,
    FETCH_ALERTS_SUCCESS,
    FETCH_ALERTS_FAILURE
} from '../actions/Types';

const initialState = {
    items: [],
    total: 0,
    loading: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ALERTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_ALERTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.concat(action.payload.alerts),
                total: action.payload.total,
                error: null
            }
        case FETCH_ALERTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            }
        default:
            return state;
    }
}
