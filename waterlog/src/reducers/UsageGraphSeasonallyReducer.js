import {
  FETCH_USAGE_SEASONALLY_BEGIN,
  FETCH_USAGE_SEASONALLY_SUCCESS,
  FETCH_USAGE_SEASONALLY_FAILURE
} from '../actions/Types';

const initialState = {
  items: [],
  item: {
    dataPoints: [
      { x: "0", y: "0" }
    ]
  },
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USAGE_SEASONALLY_BEGIN:
      return {

        ...state,
        loading: true,
        error: null
      }
    case FETCH_USAGE_SEASONALLY_SUCCESS:
      return {
        ...state,
        items: action.payload.seasonUsage,
        loading: false
      };
    case FETCH_USAGE_SEASONALLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: {}
      }
    default:
      return state;
  }
}
