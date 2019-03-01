import {
    FETCH_PMAP_DATA_BEGIN,
    FETCH_PMAP_DATA_SUCCESS,
    FETCH_PMAP_DATA_FAILURE
} from '../actions/Types';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PMAP_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PMAP_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data,
                error: null
            }

        case FETCH_PMAP_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.payload.error
            }
        default:
            return state;
    }
}
