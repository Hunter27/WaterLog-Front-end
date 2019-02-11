import {
    FETCH_SEGMENTS_LEAKS
} from '../actions/Types';

const initialState = {
    items: [{
        "id": 0,
        "segmentId": 0,
        "segmentsEntry": 0,
        "severity": "0",
        "originalTimeStamp": "0",
        "latestTimeStamp": "0",
        "resolvedStatus": "0"
    }],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEGMENTS_LEAKS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}
