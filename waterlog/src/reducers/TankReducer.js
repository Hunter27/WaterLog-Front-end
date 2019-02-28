import {
    FETCH_TANK_BEGIN,
    FETCH_TANK_SUCCESS,
    FETCH_TANK_FAILURE
} from '../actions/Types';

const initialState = {
    item: [],
    loading: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TANK_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_TANK_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.payload.tank,
                error: null
            }
        case FETCH_TANK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
