import { FETCH_LEAK_HISTORY_BEGIN, FETCH_LEAK_HISTORY_SUCCESS, FETCH_LEAK_HISTORY_FAILURE } from '../actions/Types';

const initialState = {
  item: {},
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAK_HISTORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null 
      };
    case FETCH_LEAK_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.history,
        error: null
      };
    case FETCH_LEAK_HISTORY_FAILURE:
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
