import {
    FETCH_SEGMENTS
} from '../actions/Types';

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEGMENTS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}