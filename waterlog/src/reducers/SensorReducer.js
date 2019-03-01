import {
    FETCH_SENSOR_BEGIN,
    FETCH_SENSOR_SUCCESS,
    FETCH_SENSOR_FAILURE
} from '../actions/Types';

const initialState = {
    item: [],
    loading: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SENSOR_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SENSOR_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.payload.sensor,
                error: null
            }
        case FETCH_SENSOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
