import { FETCH_COSTS_SEASONALLY } from '../actions/Types';

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
    case FETCH_COSTS_SEASONALLY:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}