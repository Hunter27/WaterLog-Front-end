import { FETCH_LEAKS_COSTS } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_LEAKS_COSTS:
        console.log("action payload ",action.payload)
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }


}