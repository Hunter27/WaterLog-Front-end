import {
    FETCH_SEGMENT_BEGIN,
    FETCH_SEGMENT_SUCCESS,
    FETCH_SEGMENT_FAILURE
} from '../actions/Types';

const initialState = {
    item: [],
    loading: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEGMENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SEGMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.payload.segment,
                error: null
            }
        case FETCH_SEGMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
