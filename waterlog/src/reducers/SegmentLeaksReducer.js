import {
    FETCH_SEGMENTS_LEAKS_BEGIN, FETCH_SEGMENTS_LEAKS_SUCCESS, FETCH_SEGMENTS_LEAKS_FAILURE
} from '../actions/Types';

const initialState = {
    items: [],
    item: {},
    loading: true,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEGMENTS_LEAKS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SEGMENTS_LEAKS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.leaks
            }

        case FETCH_SEGMENTS_LEAKS_FAILURE:
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