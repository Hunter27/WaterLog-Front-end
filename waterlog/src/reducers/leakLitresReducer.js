import { FETCH_LEAK_LITRES } from "../actions/types";

const initialState = {
  items: [],
  item: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAK_LITRES:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
