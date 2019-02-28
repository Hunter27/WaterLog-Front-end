import {
  FETCH_HEAT_MAP_DATA_BEGIN,
  FETCH_HEAT_MAP_DATA_SUCCESS,
  FETCH_HEAT_MAP_DATA_FAILURE
} from '../actions/Types';

const initialState = {
  items: [],
  loading: true,
  error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_HEAT_MAP_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_HEAT_MAP_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data,
                error:null
            }

        case FETCH_HEAT_MAP_DATA_FAILURE:
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
