import {
  FETCH_SENSORS_BEGIN,
  FETCH_SENSORS_FAILURE,
  FETCH_SENSORS_SUCCESS
} from '../actions/Types';

const initialState = {
  item: {}
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SENSORS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SENSORS_SUCCESS:
      return {
        ...state,
        item: action.payload.sensor,
        loading: false,
        error: null
      };
    case FETCH_SENSORS_FAILURE:
      return {
        ...state,
        loading: false,
        item: {},
        error: action.payload.error
      };
    default:
      return state;
  }
}
