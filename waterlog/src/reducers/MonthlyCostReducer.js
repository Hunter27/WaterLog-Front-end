import {
  FETCH_COSTS_MONTHLY_BEGIN,
  FETCH_COSTS_MONTHLY_SUCCESS,
  FETCH_COSTS_MONTHLY_FAILURE
} from '../actions/Types';

const initialState = {
  item: {
    dataPoints: [
      { x: "0", y: "0" }
    ]
  },
  loading: false,
	error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COSTS_MONTHLY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_COSTS_MONTHLY_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
        error: null
      };
    case FETCH_COSTS_MONTHLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        item: {}
      };
    default:
      return state;
  }
}
