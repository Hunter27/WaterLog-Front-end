import {
    FETCH_SEGMENTS_LEAK
} from '../actions/Types';

const initialState = {
    item: {
        "leak": {
            "id": 0,
            "severity": "normal"
        },
        "data": {
            "Item1": 0.00,
            "Item2": 0.00
        },
        "usage": {
            "Item1": 0.00,
            "Item2": 0.00
        }
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEGMENTS_LEAK:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }
}