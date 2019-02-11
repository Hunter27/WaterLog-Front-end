import { FETCH_LEAK_LITRES_BEGIN } from '../actions/Types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAK_LITRES_BEGIN:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
