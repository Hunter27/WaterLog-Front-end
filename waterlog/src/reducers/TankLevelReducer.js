import {
    FETCH_TANK_LEVELS_BEGIN, FETCH_TANK_LEVELS_SUCCESS, FETCH_TANK_LEVELS_FAILURE
} from '../actions/Types';

const initialState = {
    items: [],
    item: {},
    loading: true,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TANK_LEVELS_BEGIN:
            console.log('begin test')
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TANK_LEVELS_SUCCESS:
            console.log('levels', action.payload)
            console.log('levels', action.payload.levels)
            return {
                    ...state,
                    loading: false,
                    items: action.payload.levels,
                    error: null
                }

        case FETCH_TANK_LEVELS_FAILURE:
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
