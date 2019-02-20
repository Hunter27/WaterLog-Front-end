import { FETCH_COSTS_MONTHLY } from '../actions/Types';

const initialState = {
  item: {
    dataPoints: [
      { x: "0", y: "0" }
    ]
  },
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COSTS_MONTHLY:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}