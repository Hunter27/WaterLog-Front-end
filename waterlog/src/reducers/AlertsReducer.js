import {
    FETCH_ALERTS_BEGIN,
    FETCH_ALERTS_SUCCESS,
    FETCH_ALERTS_FAILURE,
    FETCH_FILTERED_ALERTS_BEGIN,
    FETCH_FILTERED_ALERTS_SUCCESS,
    FETCH_FILTERED_ALERTS_FAILURE,
    GET_PAGE_NUMBER
} from '../actions/Types';

const initialState = {
    items: [],
    total: 0,
    page: 1,
    loading: false,
    error: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_ALERTS_BEGIN && FETCH_FILTERED_ALERTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_ALERTS_SUCCESS && FETCH_FILTERED_ALERTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.concat(action.payload.alerts).sort((a, b) => b.status - a.status),
                total: action.payload.total,
                page: state.page + 1,
                error: null
            }
        case FETCH_ALERTS_FAILURE && FETCH_FILTERED_ALERTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,

            }
        case GET_PAGE_NUMBER:
            return {
                ...state,
                page: state.page
            }
        default:
            return state;
    }
}
